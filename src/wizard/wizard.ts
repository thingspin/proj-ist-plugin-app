//ref : https://www.cc28tech.com/angular-2-multi-step-wizard-ui-router-part-1/

// angular 2
import './utils/polyfills';

/* App Root */
import { AppComponent } from './components/app.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

/* App Modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UIRouterModule } from "@uirouter/angular";
import { FileInputAccessorModule } from "file-input-accessor";
import { SelectModule } from 'ng2-select';
import { HttpModule } from '@angular/http';

/* App Utils */
import { UIRouterConfigFn } from "./utils/app.router";
import { appRouters, appProviders, appDeclarations, appEntryCompoents} from "./utils/app.states";

import { loadPluginCss } from 'grafana/app/plugins/sdk';

const appId = "proj-edge-ai-app";
loadPluginCss({
    dark: `plugins/${appId}/css/${appId}.dark.css`,
    light: `plugins/${appId}/css/${appId}.light.css`
});

@NgModule({
    imports: [
        BrowserModule,
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
    entryComponents: appEntryCompoents,
    providers: appProviders,
    declarations: appDeclarations,
    bootstrap: [AppComponent]
})
export class WizardModule {
}

export class Wizard {
    appModel: any;
    splash: any;
    theme: string;
    static template = require(`./wizard.html`);

    /** ngInject **/
    constructor(private backendSrv, private $location) {
        this.splash = ('appModel' in this && 'baseUrl' in this.appModel) ?
            `${this.appModel.baseUrl}/img/thingspin-text-ani.svg` :
            `public/plugins/${appId}/img/thingspin-text-ani.svg`;
        // Ref : https://stackoverflow.com/questions/38948463/passing-server-parameters-to-ngmodule-after-rc5-upgrade

        setTimeout(() => {
            platformBrowserDynamic( [
                { provide: 'backendSrv',    useValue: this.backendSrv },
                { provide: 'appModel',      useValue: this.appModel },
                { provide: '$location',     useValue: this.$location, },
            ]).bootstrapModule(WizardModule);
        }, 500);
    }
}
