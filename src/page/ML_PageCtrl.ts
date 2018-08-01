
import {loadPluginCss} from 'grafana/app/plugins/sdk';

const appId = "proj-edge-ai-app";
const baseCssFilename = "proj-edge-ai-app";
loadPluginCss({
    dark: `plugins/${appId}/css/${baseCssFilename}.dark.css`,
    light: `plugins/${appId}/css/${baseCssFilename}.light.css`
});

export class MachineLearningPageCtrl {
    static template = require(`./ML_PageCtrl.html`);
}
