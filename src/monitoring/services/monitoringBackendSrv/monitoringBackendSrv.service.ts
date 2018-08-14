import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class MonitoringBackendService {

    constructor( @Inject(Http) private http: Http ) {
    }

    getConfigList(): Promise<Response> {
        // let Res: ConfigList[];
        return this.http.get("/api/ml").toPromise();
    }
}
