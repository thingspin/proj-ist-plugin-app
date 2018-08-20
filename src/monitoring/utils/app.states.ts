import {APP_BASE_HREF, LocationStrategy} from '@angular/common';

/* App Root */
import { AppComponent } from '../components/app.component';
import { ScriptRowComponent } from  '../components/script/component';
import { ScriptListComponent } from  '../components/sctriptList/component';

/* Shared Service */
import { CustomLocationStrategy, MONITORING_BASE_HREF } from "./common";
import { MonitoringBackendService } from '../services/monitoringBackendSrv/monitoringBackendSrv.service';
import { MqttService } from '../services/mqtt/mqttSrv.service';

export const appProviders = [
    { provide: MqttService,                 useClass: MqttService},
    { provide: MonitoringBackendService,    useClass: MonitoringBackendService},
    { provide: APP_BASE_HREF,               useValue: MONITORING_BASE_HREF},
    { provide: LocationStrategy,            useClass: CustomLocationStrategy},
];

export const appRouters = [
    { name: 'list',      url: `list`,    component: ScriptListComponent },
];


export const appDeclarations = [
    AppComponent,
    ScriptRowComponent,
    ScriptListComponent
];
