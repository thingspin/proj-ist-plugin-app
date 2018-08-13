import { Component, /*Inject,*/ OnInit } from '@angular/core';

import { ScriptInfo } from './formData/formData.script';

@Component ({
    selector: 'app-root',
    template: require(`./app.component.html`),
    styleUrls: [
        'public/plugins/proj-edge-ai-app/css/bootstrap.min.css',
        'public/plugins/proj-edge-ai-app/css/style.css',
        'public/plugins/proj-edge-ai-app/css/loading-bars.css',
        'public/plugins/proj-edge-ai-app/css/riliwan-rabo.css'
    ],
})
export class AppComponent implements OnInit {
    title: String = 'Script Monitoring';
    scriptsList : ScriptInfo[];

    constructor(/*@Inject('backendSrv') private backendService*/) {
        console.log(this.title + ' constructor!');
    }

    ngOnInit() {
        console.log(this.title + ' loaded!');
        // this.dataReceive();        
    }

    // scriptInfoWasSelected(script: ScriptInfo): void {
    //     console.log('Product clicked: ', script);
    // }        

    // dataReceive() {
    //     this.backendService.get('api/ml').then(result => {
    //         // Use result.Result
    //         console.log(result.Result);
    //     });
    //     console.log(this.backendService);        
    // }
}
