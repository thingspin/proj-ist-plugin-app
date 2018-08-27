import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class MonitoringBackendService {

    constructor(
        @Inject(Http) private http: Http,
        @Inject("alertSrv") private alertSrv,
     ) {
    }

    private success(res: Response): Response {
        return res;
    }

    private error(error: Response) {
        console.error(error);
        this.alertSrv.set('ThingSPIN Server Error', error.json().message, 'error', 5000);
    }

    getConfigList(): Promise<void | Response> {
        // let Res: ConfigList[];
        return this.http.get("/api/ml").toPromise().then(this.success.bind(this), this.error.bind(this));
    }

    getConfigStatus(cid: String): Promise<void | Response> {
        return this.http.get(`/api/ml/${cid}/check`).toPromise().then(this.success.bind(this), this.error.bind(this));
    }

    runAlgorithm(cid: String): Promise<void | Response> {
        return this.http.post(`/api/ml/${cid}/start`, "").toPromise().then(this.success.bind(this), this.error.bind(this));
    }

    stopAlgorithm(cid: String): Promise<void | Response> {
        return this.http.post(`/api/ml/${cid}/stop`, "").toPromise().then(this.success.bind(this), this.error.bind(this));
    }

    deleteConfig(cid: String): Promise<void | Response> {
        return this.http.delete(`/api/ml/${cid}`).toPromise().then(this.success.bind(this), this.error.bind(this));
    }

    getAlgorithmLog(cid: String): Promise<void | Response> {
        return this.http.get(`/api/ml/${cid}/log`).toPromise().then(this.success.bind(this), this.error.bind(this));
    }
    getAlgorithmSomeLog(cid: String, line: number): Promise<void | Response> {
        return this.http.get(`/api/ml/${cid}/log/${line}`).toPromise().then(this.success.bind(this), this.error.bind(this));
    }
}
