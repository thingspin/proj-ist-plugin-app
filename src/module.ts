//import {loadPluginCss} from 'grafana/app/plugins/sdk';

// MQTT service

import {AppConfigCtrl} from './app-config/config';

/*
const appId = "proj-ist-plugin-app";
const baseCssFilename = "ist-plugin-app";

loadPluginCss({
  dark: `plugins/${appId}/css/${baseCssFilename}.dark.css`,
  light: `plugins/${appId}/css/${baseCssFilename}.light.css`
});
*/
export {
  AppConfigCtrl as ConfigCtrl,
};
