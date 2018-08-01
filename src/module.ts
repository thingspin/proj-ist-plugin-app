import {loadPluginCss} from 'grafana/app/plugins/sdk';
import {MachineLearningPageCtrl} from './page/ML_PageCtrl';

// register Remote Solution Services
import './services/projEdgeAiSrv';

import {AppConfigCtrl} from './app-config/config';

const appId = "proj-edge-ai-app";
const baseCssFilename = "proj-edge-ai-app";
loadPluginCss({
  dark: `plugins/${appId}/css/${baseCssFilename}.dark.css`,
  light: `plugins/${appId}/css/${baseCssFilename}.light.css`
});

export {
  AppConfigCtrl as ConfigCtrl,
  MachineLearningPageCtrl
};
