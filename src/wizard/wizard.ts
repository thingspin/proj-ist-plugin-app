// angular 2 Modules
import { WizardModule } from './app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// Grafana SDK
import { loadPluginCss } from 'grafana/app/plugins/sdk';

const appId = "proj-edge-ai-app";
loadPluginCss({
    dark: `plugins/${appId}/css/${appId}.dark.css`,
    light: `plugins/${appId}/css/${appId}.light.css`
});

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
