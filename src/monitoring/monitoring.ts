//ref : https://www.cc28tech.com/angular-2-multi-step-wizard-ui-router-part-1/

// angular 2
import './utils/polyfills';

/* App Root */
import { AppComponent } from './components/app.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

/* App Modules */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';

/* App Utils */
import { appProviders, appDeclarations, appRouters} from "./utils/app.states";

// Grafana SDK
import { loadPluginCss } from 'grafana/app/plugins/sdk';
import { UIRouterModule } from '@uirouter/angular';

const appId = "proj-edge-ai-app";
loadPluginCss({
    dark: `plugins/${appId}/css/${appId}.dark.css`,
    light: `plugins/${appId}/css/${appId}.light.css`
});

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        // Mateiral Design Modules
        MatTableModule, MatPaginatorModule, MatIconModule,
        UIRouterModule.forRoot({
            states: appRouters,
            useHash: true,
        }),
    ],
    providers: appProviders,
    declarations: appDeclarations,
    bootstrap: [AppComponent]
})
export class MonitoringModule {
}

export class Monitoring {
    appModel: any;
    splash: any;
    static template = require(`./monitoring.html`);

    /** ngInject **/
    constructor(private backendSrv) {
        this.splash = ('appModel' in this && 'baseUrl' in this.appModel) ?
            `${this.appModel.baseUrl}/img/thingspin-text-ani.svg` :
            `public/plugins/${appId}/img/thingspin-text-ani.svg`;

        // Ref : https://stackoverflow.com/questions/38948463/passing-server-parameters-to-ngmodule-after-rc5-upgrade
        setTimeout(() => {
            platformBrowserDynamic( [
                { provide: 'backendSrv', useValue: this.backendSrv },
                { provide: 'appModel', useValue: this.appModel}
            ]).bootstrapModule(MonitoringModule);
        }, 500);
    }
}