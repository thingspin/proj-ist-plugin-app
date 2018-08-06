import { WizardModule } from './app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { loadPluginCss } from 'grafana/app/plugins/sdk';
import '../css/loading-bars.css';

export class Wizard {
    appModel: any;
    splash: any;
    static template = require(`./wizard.html`);
    appId = "proj-edge-ai-app";

    /** ngInject **/
    constructor($scope, $rootScope, $window) {
        if(this.appModel !== undefined && this.appModel !== null && 'baseUrl' in this.appModel) {
            this.splash = this.appModel.baseUrl + '/img/splash.svg';
        } else {
            this.splash = 'public/plugins/' + this.appId + '/img/splash.svg';
        }

        loadPluginCss({
            dark: `plugins/${this.appId}/css/${this.appId}.dark.css`,
            light: `plugins/${this.appId}/css/${this.appId}.light.css`
        });

        setTimeout(function() { 
            platformBrowserDynamic().bootstrapModule(WizardModule);
        }, 300);
    }
}
