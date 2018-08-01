
import {loadPluginCss} from 'grafana/app/plugins/sdk';
import * as commonModel from '../models/common';
import * as ml from '../models/ML';

const appId = "proj-edge-ai-app";
const baseCssFilename = "proj-edge-ai-app";
loadPluginCss({
    dark: `plugins/${appId}/css/${baseCssFilename}.dark.css`,
    light: `plugins/${appId}/css/${baseCssFilename}.light.css`
});

export class InferenceConfigurationPageCtrl {
    // default PageCtrl Data
    appModel: any;

    // view only Data
    static template = require(`./IC_PageCtrl.html`);
    tabs: commonModel.TabStruct[];
    editor: commonModel.EditorStruct;

    // Manage Data
    step1: ml.Step1Struct;
    step2: ml.Step2Struct;
    step3: ml.Step3Struct;
    step4: ml.Step4Struct;
    step5: ml.Step5Struct;

    constructor() {
        this.tabs = [
            {title: "Step 1", src: "step1.html"},
            {title: "Step 2", src: "step2.html"},
            {title: "Step 3", src: "step3.html"},
            {title: "Step 4", src: "step4.html"},
        ];
        this.editor = { index: 0 };
    }
}
