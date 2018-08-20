import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { InferenceConfig } from '../../models/default.model';
import { MonitoringBackendService } from '../../services/monitoringBackendSrv/monitoringBackendSrv.service';
import { Response } from '@angular/http';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { appEvents } from 'grafana/app/core/core';
import { getStyleUrls } from '../../utils/common';

/* load codemirror  */
import 'codemirror/mode/python/python';
import "../../../../node_modules/codemirror/lib/codemirror.css";
import "../../../../node_modules/codemirror/theme/material.css";


@Component({
    selector: 'scripts-list',
    template: require(`./component.html`),
    styleUrls: getStyleUrls(),
})
export class ScriptListComponent implements OnInit {

    codemirrorConfig: any;
    scriptsList: InferenceConfig[] = [];

    displayedColumns: string[] = ['cname', 'algorithmName', 'model', "action"];
    dataSource: MatTableDataSource<InferenceConfig>;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        @Inject(MonitoringBackendService) private backendSrv: MonitoringBackendService,
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
    }

    updateList(): Promise<any> {
        return this.backendSrv.getConfigList().then((res: Response) => {
            const { Result }: {Result: any} = res.json();

            this.scriptsList = this.updateRunning(Result);
            this.dataSource.data = Result;
        });
    }

    updateRunning(list: any[]): Array<InferenceConfig> {
        list.forEach(({ cid }: {cid: String}, idx: number) => {
            this.backendSrv.getConfigStatus(cid).then( (res: Response) => {
                const message: {CodeNum: number, Error: string} = res.json();
                switch (message.CodeNum) {
                    case 0: list[idx].running = true; break;
                    case 1: list[idx].running = false;break;
                    case 2: list[idx].running = false;
                        console.log(message.Error);
                    break;
                }
            }, (error: Response) => {
                console.error(error);
            });
        });
        return list;
    }

    runAlgorithm(cid: String): void {
        console.log(`running ${cid}`);
        this.backendSrv.runAlgorithm(cid).then( (res: Response) => {
            this.scriptsList.forEach((config: InferenceConfig, idx: number, arr: any) => {
                if (config.cid === cid) {
                    arr[idx].running = true;
                }
            });
            this.dataSource.data = this.scriptsList;
        }, (error: Response) => {
            console.error(error);
        });
    }

    stopAlgorithm(cid: String): void {
        console.log(`stoped ${cid}`);
        this.backendSrv.stopAlgorithm(cid).then( (res: Response) => {
            this.scriptsList.forEach((config: InferenceConfig, idx: number, arr: any) => {
                if (config.cid === cid) {
                    arr[idx].running = false;
                }
            });
            this.dataSource.data = this.scriptsList;
        }, (error: Response) => {
            console.error(error);
        });
    }

    deleteConfig(cid): void {
        appEvents.emit('confirm-modal', {
            title: 'Delete Inference Configuration',
            text: 'Are you sure you want to delete?',
            yesText: "Delete",
            icon: "fa-trash",
            onConfirm: () => {
                this.backendSrv.deleteConfig(cid).then( (res: Response) => {
                    console.log(`removed ${cid}`);
                    this.updateList();
                });
            }
        });
    }

    editConfig(cid: string): void {
        window.location.href = `/plugins/proj-edge-ai-app/page/wizard?cid=${cid}`;
    }
}
