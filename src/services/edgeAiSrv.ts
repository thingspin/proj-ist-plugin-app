import coreModule from 'grafana/app/core/core_module';
import { Injectable } from '../../node_modules/@angular/core';

@Injectable()
export class EdgeAiService {
    appModel: any;

    constructor(appModel: any) {
        this.appModel = appModel;
    }

    getSettings(): any {
        return this.appModel.jsonData;
    }
}

coreModule.service('edgeAiService', EdgeAiService);
