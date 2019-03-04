import {loadPluginCss} from 'grafana/app/plugins/sdk';
import {AppConfigCtrl} from './app-config/config';

const appId = "proj-ist-plugin-app";

loadPluginCss({
  dark: `plugins/${appId}/css/dark.css`,
  light: `plugins/${appId}/css/light.css`
});

export {
  AppConfigCtrl as ConfigCtrl,
};
