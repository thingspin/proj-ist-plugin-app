import {loadPluginCss} from 'grafana/app/plugins/sdk';
// register Remote Solution Services
// import './services/projEdgeAiSrv';

import {InferenceConfigurationPageCtrl} from './page/IC_PageCtrl';

import {AppConfigCtrl} from './app-config/config';

const appId = "proj-edge-ai-app";
const baseCssFilename = "proj-edge-ai-app";
loadPluginCss({
  dark: `plugins/${appId}/css/${baseCssFilename}.dark.css`,
  light: `plugins/${appId}/css/${baseCssFilename}.light.css`
});

export {
  AppConfigCtrl as ConfigCtrl,
  InferenceConfigurationPageCtrl
};
