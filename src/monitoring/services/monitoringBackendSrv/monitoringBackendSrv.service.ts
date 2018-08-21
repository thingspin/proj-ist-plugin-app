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

    getConfigStatus(cid: String): Promise<Response> {
        return this.http.get(`/api/ml/${cid}/check`).toPromise();
    }

    runAlgorithm(cid: String): Promise<Response> {
        return this.http.post(`/api/ml/${cid}/start`, "").toPromise();
    }

    stopAlgorithm(cid: String): Promise<Response> {
        return this.http.post(`/api/ml/${cid}/stop`, "").toPromise();
    }

    deleteConfig(cid: String): Promise<Response> {
        return this.http.delete(`/api/ml/${cid}`).toPromise();
    }

    getAlgorithmLog(cid: String): Promise<Response> {
        return this.http.get(`/api/ml/${cid}/log`).toPromise();
    }
}
