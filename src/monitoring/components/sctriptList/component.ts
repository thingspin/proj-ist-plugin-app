/* Grafana Libraries */
import { appEvents, liveSrv } from 'grafana/app/core/core';

/* Angular(2+) Libraries */
import { Response } from '@angular/http';
import { MatPaginator, MatTableDataSource, MatTable } from '@angular/material';
import { Component, Inject, ViewChild, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
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

interface Message {
    stream: string;
    data: string;
}

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
    scriptsList: any = [];

    displayedColumns: string[] = ['cname', 'algorithmName', 'model', 'action'];
    currElement: InferenceConfig;
    logObservable: any;
    enableLog: boolean;
    currAlgorithmName: String;
    mlLiveObserver: any;

    dataSource: MatTableDataSource<InferenceConfig>;
    @ViewChild('terminal') container: ElementRef;
    @ViewChild('table') table: MatTable<InferenceConfig>;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    private xterm: xterm.Terminal;
    constructor(
        @Inject(MonitoringBackendService) private backendSrv: MonitoringBackendService,
        @Inject(MqttService) private mqttSrv: MqttService,
        @Inject('$location') private $location,
        @Inject('appModel') private appModel,
        @Inject(ChangeDetectorRef) private cdRef: ChangeDetectorRef,
    ) {
        this.codemirrorConfig = {
            mode: 'python',
            lineNumbers: true,
        };
    }

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource<InferenceConfig>([]);
        this.updateList().then( () => {
            this.dataSource.paginator = this.paginator;
        });

        this.mlLiveObserver = liveSrv.subscribe("service_monitor");
        this.mlLiveObserver.subscribe(this.mlLiveReceived.bind(this));

        const urlPath = "/mqtt";
        const baseUrl = `ws://${this.$location.host()}:${this.$location.port()}/api/plugin-proxy/${this.appModel.id}`;
        this.mqttSrv.connect(`${baseUrl}${urlPath}`);

        this.xterm = new Terminal();
        this.xterm.open(this.container.nativeElement);
        fit(this.xterm);

        this.enableLog = false;
    }

    private mlLiveReceived(message: Message): void {
        const { data }: {data: string } = message;
        const [ targetCid, msg ] = data.split(" ");

        const bool: Boolean = msg === "started" ? true : false;
        for (let cid  in this.scriptsList) {
            if (targetCid === cid) {
                this.scriptsList[cid].running = bool;
            }
        }
    }

    private updateList(): Promise<any> {
        return this.backendSrv.getConfigList().then((res: Response) => {
            const { Result }: {Result: any} = res.json();

            this.scriptsList = this.updateRunning(Result);
            let ds: InferenceConfig[] = [];
            for (let cid in this.scriptsList) {
                this.scriptsList[cid].cid = cid;
                ds.push(this.scriptsList[cid]);
            }
            this.dataSource.data = ds;
            this.table.renderRows();
        });
    }

    private updateRunning(list: any): Array<InferenceConfig> {
        for (let cid in list) {
            list[cid].cid = cid;
            this.backendSrv.getConfigStatus(cid).then( (res: Response) => {
                const message: {CodeNum: number, Error: string} = res.json();
                switch (message.CodeNum) {
                    case 0: list[cid].running = true; break;
                    case 1: list[cid].running = false;break;
                    case 2: list[cid].running = false;
                        list[cid].error = message.Error;
                    break;
                }
            }, (error: Response) => {
                console.error(error);
            });
        }
        return list;
    }

    public runAlgorithm(cid: any): void {
        console.log(cid);
        console.log(`running ${cid}`);
        this.backendSrv.runAlgorithm(cid).then( (res: Response) => {
            let ds: InferenceConfig[] = [];
            for (let configCid in this.scriptsList) {
                let config = this.scriptsList[configCid];
                config.cid = configCid;
                if (config.cid === cid) {
                    this.startRtlog(config);
                }
                ds.push(config);
            }
            this.dataSource = new MatTableDataSource<InferenceConfig>(ds);
            this.table.renderRows();
        }, (error: Response) => {
            console.error(error);
        });
    }

    public stopAlgorithm(cid: String): void {
        console.log(`stoped ${cid}`);
        this.backendSrv.stopAlgorithm(cid).then( (res: Response) => {
            let ds: InferenceConfig[] = [];
            for (let configCid in this.scriptsList) {
                let config = this.scriptsList[configCid];
                config.cid = configCid;
                if (config.cid === cid) {
                    this.stopRtlog(config);
                }
                ds.push(config);
            }
            this.dataSource = new MatTableDataSource<InferenceConfig>(ds);
            this.table.renderRows();
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
                    this.updateList().then( () => {
                        this.cdRef.detectChanges();
                    });
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
        this.enableLog = true;
        this.currAlgorithmName = element.algorithmName;
        this.currElement = element;
        this.xterm.writeln(`listening \x1B[1;3;31m${element.cname}\x1B[0m logger...`);
        this.logObservable = liveSrv.subscribe(`service_${element.cid}`);
        this.logObservable.subscribe(data => {
            this.xterm.writeln(data.data);
        });
    }

    private stopRtlog(element: InferenceConfig): void {
        this.xterm.clear();
        this.enableLog = false;
        liveSrv.removeObserver(`service_${element.cid}`, null);
    }

    public showHistory(element: InferenceConfig): void {
        this.xterm.clear();
        if ( this.currElement === element) {
            this.enableLog = false;
            this.currElement = null;
        } else {
            this.enableLog = true;
            this.currElement = element;
            this.currAlgorithmName = element.algorithmName;
            this.backendSrv.getAlgorithmLog(element.cid).then( (res: Response): void => {
                const { log }: { log: string } = res.json();
                log.split('\n').forEach( (str: string): void => {
                    this.xterm.writeln(str);
                });
            });
        }
    }

    public closeTerminal(element: InferenceConfig): void {
        this.xterm.clear();
        this.enableLog = false;
    }
}
