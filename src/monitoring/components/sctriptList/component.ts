import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { InferenceConfig } from '../../models/default.model';
import { MonitoringBackendService } from '../../services/monitoringBackendSrv/monitoringBackendSrv.service';
import { Response } from '@angular/http';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { appEvents } from 'grafana/app/core/core';

@Component({
    selector: 'scripts-list',
    template: require(`./component.html`),
    styleUrls: [
        'public/plugins/proj-edge-ai-app/css/monitoring.css',
    ],
})
export class ScriptListComponent implements OnInit {

    scriptsList: InferenceConfig[] = [];

    displayedColumns: string[] = ['cname', 'algorithmName', 'model', "action"];
    dataSource: MatTableDataSource<InferenceConfig>;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        // @Inject(ChangeDetectorRef) private chRef: ChangeDetectorRef,
        @Inject(MonitoringBackendService) private backendSrv: MonitoringBackendService,
    ) {
        this.dataSource = new MatTableDataSource<InferenceConfig>();
        this.updateList();
    }

    ngOnInit(): void {
    }

    updateList() {
        this.backendSrv.getConfigList().then((res: Response) => {
            this.scriptsList = this.updateRunning(res.json().Result);
            this.dataSource.paginator = this.paginator;
            this.dataSource.data = res.json().Result;
        });
    }

    updateRunning(list: any[]): Array<InferenceConfig> {
        list.forEach(({ cid }: {cid: String}, idx: number) => {
            this.backendSrv.getConfigStatus(cid).then( (res: Response) => {
                list[idx].running = true;
            }, (error: Response) => {
                const { message }: {message: String} = error.json();
                switch (message) {
                    case "not running":
                        list[idx].running = false;
                    break;
                }
            });
        });
        return list;
    }
    runAlgorithm(cid: String): void {
        console.log(`running ${cid}`);
        this.backendSrv.runAlgorithm(cid).then( (res: Response) => {
            console.log(res);
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
            console.log(res);
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
}
