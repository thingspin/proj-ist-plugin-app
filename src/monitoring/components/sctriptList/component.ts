import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { InferenceConfig } from '../../models/default.model';
import { MonitoringBackendService } from '../../services/monitoringBackendSrv/monitoringBackendSrv.service';
import { Response } from '@angular/http';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'scripts-list',
    template: require(`./component.html`),
    styleUrls: [
        'public/plugins/proj-edge-ai-app/css/monitoring.css',
    ],
})
export class ScriptListComponent implements OnInit {

    scriptsList: InferenceConfig[] = [];

    displayedColumns: string[] = ['cname', 'algorithmName', 'model'];
    dataSource: MatTableDataSource<InferenceConfig>;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        @Inject(MonitoringBackendService) private monitoringBackendService: MonitoringBackendService,
    ) {
        this.monitoringBackendService.getConfigList().then((res: Response) => {
            console.log(res.json().Result);
            this.scriptsList = res.json().Result;

            this.dataSource = new MatTableDataSource<InferenceConfig>(res.json().Result);
            this.dataSource.paginator = this.paginator;
        });
    }
    ngOnInit() {
    }
}
