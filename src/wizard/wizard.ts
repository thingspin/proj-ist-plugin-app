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
import { UIRouterModule } from "@uirouter/angular";
import { FileInputAccessorModule } from "file-input-accessor";
import { SelectModule } from 'ng2-select';
import { HttpModule } from '@angular/http';

/* App Utils */
import { UIRouterConfigFn } from "./utils/app.router";
import { appRouters, appProviders, appDeclarations} from "./utils/app.states";

// Grafana SDK
import { loadPluginCss } from 'grafana/app/plugins/sdk';

const appId = "proj-edge-ai-app";
loadPluginCss({
    dark: `plugins/${appId}/css/${appId}.dark.css`,
    light: `plugins/${appId}/css/${appId}.light.css`
});

@NgModule({
    imports: [BrowserModule,
        FileInputAccessorModule,
        SelectModule,
        FormsModule,
        HttpModule,
        UIRouterModule.forRoot({
            states: appRouters,
            useHash: true,
            config: UIRouterConfigFn
        }),
    ],
    providers: appProviders,
    declarations: appDeclarations,
    bootstrap: [AppComponent]
})
export class WizardModule {
}

export class Wizard {
    appModel: any;
    splash: any;
    static template = require(`./wizard.html`);

    /** ngInject **/
    constructor(private backendSrv) {
        this.splash = ('appModel' in this && 'baseUrl' in this.appModel) ?
            `${this.appModel.baseUrl}/img/splash.svg` :
            `public/plugins/${appId}/img/splash.svg`;

        setTimeout(() => {
            // Ref : https://stackoverflow.com/questions/38948463/passing-server-parameters-to-ngmodule-after-rc5-upgrade
            platformBrowserDynamic( [
                { provide: 'backendSrv',    useValue: this.backendSrv },
                { provide: 'appModel',      useValue: this.appModel }
            ]).bootstrapModule(WizardModule);
        }, 500);
    }
}
