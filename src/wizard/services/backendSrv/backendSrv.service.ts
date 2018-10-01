import { Inject, Injectable } from '@angular/core';
import { Http, Response, ResponseContentType } from '@angular/http';

@Injectable()
export class BackendService {

    constructor(
        @Inject(Http) private http: Http,
        @Inject('alertSrv') private alertSrv,
    ) {
    }

    private success(res: Response): Response {
        return res;
    }

    private error(error: Response) {
        console.error(error);
        this.alertSrv.set('ThingSPIN Error', error.toString(), 5000);
    }

    getConfigList(): Promise<void | Response> {
        // let Res: ConfigList[];
        return this.http.get("/api/ml").toPromise().then(this.success.bind(this), this.error.bind(this));
    }

    getConfig(cid: String): Promise<void | Response> {
        // let Res: ConfigList[];
        return this.http.get(`/api/ml/${cid}`).toPromise().then(this.success.bind(this), this.error.bind(this));
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

    saveConfig(sendData: FormData): Promise<void | Response> {
        return this.http.post('/api/ml', sendData).toPromise().then(this.success.bind(this), this.error.bind(this));
    }

    updateConfig(cid: String, sendData: FormData): Promise<void | Response> {
        return this.http.put(`/api/ml/${cid}`, sendData).toPromise().then(this.success.bind(this), this.error.bind(this));
    }

    getModelFile(cid: String, fileName: string): Promise<void | any> {
        return this.http.get(`/api/ml/${cid}/model/${fileName}`, {responseType: ResponseContentType.Blob}).toPromise()
        .then(this.success.bind(this), this.error.bind(this))
        .then( res => {
            return new File([res.blob()], fileName);
        });
    }

    getAlgorithmFile(cid: String, fileName: string): Promise<void | any> {
        return this.http.get(`/api/ml/${cid}/algorithm/${fileName}`, {responseType: ResponseContentType.Blob}).toPromise()
        .then(this.success.bind(this), this.error.bind(this))
        .then( res => {
            return new File([res.blob()], fileName);
        });
    }
}
