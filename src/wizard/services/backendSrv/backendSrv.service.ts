import { Inject, Injectable } from '@angular/core';
import { Http, Response, ResponseContentType } from '@angular/http';

@Injectable()
export class BackendService {

    constructor( @Inject(Http) private http: Http ) {
    }

    getConfigList(): Promise<Response> {
        // let Res: ConfigList[];
        return this.http.get("/api/ml").toPromise();
    }

    getConfig(cid: String): Promise<Response> {
        // let Res: ConfigList[];
        return this.http.get(`/api/ml/${cid}`).toPromise();
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

    getModelFile(cid: String, fileName: string): Promise<any> {
        return this.http.get(`/api/ml/${cid}/model/${fileName}`, {responseType: ResponseContentType.Blob}).toPromise().then( res => {
            return new File([res.blob()], fileName);
        });
    }

    getAlgorithmFile(cid: String, fileName: string): Promise<any> {
        return this.http.get(`/api/ml/${cid}/algorithm/${fileName}`, {responseType: ResponseContentType.Blob}).toPromise().then( res => {
            return new File([res.blob()], fileName);
        });
    }
}
