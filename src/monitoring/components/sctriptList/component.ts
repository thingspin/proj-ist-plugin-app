/* Grafana Libraries */
import { appEvents, liveSrv } from 'grafana/app/core/core';

/* Angular(2+) Libraries */
import { Response } from '@angular/http';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Component, Inject, ViewChild, OnInit, ElementRef } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

/* Data Structs */
import { InferenceConfig } from '../../models/default.model';

/* Custom Services*/
import { MonitoringBackendService } from '../../services/monitoringBackendSrv/monitoringBackendSrv.service';
import { MqttService } from '../../services/mqtt/mqttSrv.service';

/* npm(yarn) libraries */
// codemirror : https://github.com/codemirror/CodeMirror
import 'codemirror/mode/python/python';
// xterm : https://xtermjs.org/
import xterm from 'xterm';
import { Terminal } from 'xterm';
import { fit } from 'xterm/lib/addons/fit/fit';

/* style loader (css or sass or less) */
import './component.css';
import 'xterm/dist/xterm.css';
import { getStyleUrls } from '../../utils/common';

@Component({
    selector: 'scripts-list',
    template: require(`./component.html`),
    styleUrls: getStyleUrls([]),
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class ScriptListComponent implements OnInit {

    codemirrorConfig: any;
    scriptsList: InferenceConfig[] = [];

    displayedColumns: string[] = ['cname', 'algorithmName', 'model', "action"];
    dataSource: MatTableDataSource<InferenceConfig>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    currElement: InferenceConfig;
    logObservable: any;

    @ViewChild('terminal') container: ElementRef;
    private xterm: xterm.Terminal;
    constructor(
        @Inject(MonitoringBackendService) private backendSrv: MonitoringBackendService,
        @Inject(MqttService) private mqttSrv: MqttService,
        @Inject('$location') private $location,
        @Inject('appModel') private appModel,
    ) {
        this.dataSource = new MatTableDataSource<InferenceConfig>();
        this.updateList().then( (value) => {
            this.dataSource.paginator = this.paginator;
        });

        this.codemirrorConfig = {
            mode: 'python',
            lineNumbers: true,
        };
    }

    ngOnInit(): void {
        const urlPath = "/mqtt";
        const baseUrl = `ws://${this.$location.host()}:${this.$location.port()}/api/plugin-proxy/${this.appModel.id}`;
        this.mqttSrv.connect(`${baseUrl}${urlPath}`);
    }

    private updateList(): Promise<any> {
        return this.backendSrv.getConfigList().then((res: Response) => {
            const { Result }: {Result: any} = res.json();

            this.scriptsList = this.updateRunning(Result);
            this.dataSource.data = Result;
        });
    }

    private updateRunning(list: any[]): Array<InferenceConfig> {
        list.forEach(({ cid }: {cid: String}, idx: number) => {
            this.backendSrv.getConfigStatus(cid).then( (res: Response) => {
                const message: {CodeNum: number, Error: string} = res.json();
                switch (message.CodeNum) {
                    case 0: list[idx].running = true; break;
                    case 1: list[idx].running = false;break;
                    case 2: list[idx].running = false;
                        list[idx].error = message.Error;
                    break;
                }
            }, (error: Response) => {
                console.error(error);
            });
        });
        return list;
    }

    public runAlgorithm(cid: String): void {
        console.log(`running ${cid}`);
        this.backendSrv.runAlgorithm(cid).then( (res: Response) => {
            this.scriptsList.forEach((config: InferenceConfig, idx: number, arr: any) => {
                if (config.cid === cid) {
                    arr[idx].running = true;
                    this.startRtlog(config);
                }
            });
            this.dataSource.data = this.scriptsList;
        }, (error: Response) => {
            console.error(error);
        });
    }

    public stopAlgorithm(cid: String): void {
        console.log(`stoped ${cid}`);
        this.backendSrv.stopAlgorithm(cid).then( (res: Response) => {
            this.scriptsList.forEach((config: InferenceConfig, idx: number, arr: any) => {
                if (config.cid === cid) {
                    arr[idx].running = false;
                    this.stopRtlog(config);
                }
            });
            this.dataSource.data = this.scriptsList;
        }, (error: Response) => {
            console.error(error);
        });
    }

    public deleteConfig(cid): void {
        appEvents.emit('confirm-modal', {
            title: 'Delete Inference Configuration',
            text: 'Are you sure you want to delete?',
            yesText: "Delete",
            icon: "fa-trash",
            onConfirm: () => {
                this.backendSrv.deleteConfig(cid).then( (res: Response) => {
                    console.log(`removed ${cid}`);
                    this.updateList();
                    this.mqttPublish().then( () => {
                    });
                });
            }
        });
    }

    editConfig(cid: string): void {
        window.location.href = `/plugins/proj-edge-ai-app/page/wizard?cid=${cid}`;
    }

    isMain(el: InferenceConfig, file: string): boolean {
        const mainFile: String = `${el.algorithmName}${el.algorithmType}`;
        return (mainFile === file) ? true : false;
    }

    mqttPublish(): Promise<any> {
        const topic = `config`;
        return this.backendSrv.getConfigList().then( (res: Response) => {
           return this.mqttSrv.publishMessage(topic, JSON.stringify(res.json().Result), {
                qos: 0,
                retain: true,
                dup: false,
            });
        });
    }

    public showLog(element: InferenceConfig): void {
        if ( this.currElement === element) {
            this.stopRtlog(element);
            this.currElement = null;
        } else {
            this.startRtlog(element);
        }
    }

    private startRtlog(element: InferenceConfig): void {
        this.stopRtlog(element);
        this.xterm = new Terminal();
        this.xterm.open(this.container.nativeElement);
        fit(this.xterm);
        this.currElement = element;
        this.xterm.writeln(`listening Algorithm(\x1B[1;3;31m${element.cname}\x1B[0m) logger...`);
        this.logObservable = liveSrv.subscribe(`service_${element.cid}`);
        this.logObservable.subscribe(data => {
            this.xterm.writeln(data.data);
        });
    }

    private stopRtlog(element: InferenceConfig): void {
        if (this.xterm) {
            this.xterm.destroy();
            this.xterm = undefined;
        }
        liveSrv.removeObserver(`service_${element.cid}`, null);
    }

    public showHistory(element: InferenceConfig): void {
        if (this.xterm) {
            this.xterm.destroy();
            this.xterm = undefined;
        }
        this.xterm = new Terminal();
        this.xterm.open(this.container.nativeElement);
        fit(this.xterm);

        this.backendSrv.getAlgorithmLog(element.cid).then( (res: Response): void => {
            const { log }: { log: string } = res.json();
            log.split('\n').forEach( (str: string): void => {
                this.xterm.writeln(str);
            });
        });
    }

}
