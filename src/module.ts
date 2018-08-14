import {loadPluginCss} from 'grafana/app/plugins/sdk';
import {AppConfigCtrl} from './app-config/config';
import {Wizard} from './wizard/wizard';
import {Monitoring} from './monitoring/monitoring';

const appId = "proj-edge-ai-app";
const baseCssFilename = "proj-edge-ai-app";

loadPluginCss({
  dark: `plugins/${appId}/css/${baseCssFilename}.dark.css`,
  light: `plugins/${appId}/css/${baseCssFilename}.light.css`
});

export {
  AppConfigCtrl as ConfigCtrl,
  Wizard,
  Monitoring,
};
