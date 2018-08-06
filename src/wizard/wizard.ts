//ref : https://www.cc28tech.com/angular-2-multi-step-wizard-ui-router-part-1/

// angular 2 Modules
import './utils/polyfills';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UIRouterModule } from "@uirouter/angular";
import { FormsModule } from '@angular/forms';

/* App Root */
import { AppComponent } from './components/app.component';

/* App Router */
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
        FormsModule,
        UIRouterModule.forRoot({
            states: appRouters,
            useHash: true,
            config: UIRouterConfigFn
        })
    ],
    providers: appProviders,
    declarations: appDeclarations,
    bootstrap: [AppComponent]
})
class WizardModule { }

export class Wizard {
    appModel: any;
    splash: any;
    static template = require(`./wizard.html`);

    /** ngInject **/
    constructor($scope, $rootScope, $window) {
        this.splash = ('appModel' in this && 'baseUrl' in this.appModel) ?
            `${this.appModel.baseUrl}/img/splash.svg` :
            `public/plugins/${appId}/img/splash.svg`;


        setTimeout(function() {
            platformBrowserDynamic().bootstrapModule(WizardModule);
        }, 300); // ????
    }
}
