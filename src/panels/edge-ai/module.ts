import { MetricsPanelCtrl, loadPluginCss } from 'grafana/app/plugins/sdk';

const appId = "proj-edge-ai-app";
const baseCssFilename = "proj-edge-ai-app";
loadPluginCss({
    dark: `plugins/${appId}/css/${baseCssFilename}.dark.css`,
    light: `plugins/${appId}/css/${baseCssFilename}.light.css`
});

class ProjEdgeAiPanelCtrl extends MetricsPanelCtrl {
    static template = require(`./partial/template.html`);
    divID: String = "app-edge-ai-panel";

    private _container: any;
    set container(container: any) { this._container = container; }
    get container() { return this._container; }

    constructor($scope, $injector, private $element ) {
        super($scope, $injector);

        this.events.on('panel-initialized', this.onInitialized.bind(this));
        this.events.on('data-received', this.onDataReceived.bind(this));
    }

    onInitialized() {
        const node: any = this.$element.find("ng-transclude > div");
        if (node.length === 0) {
            console.error(`cannot find element id '#${this.divID}'`);
            return;
        }
        this.container = node;
    }

    onDataReceived(dataList) {
        console.log(dataList);
    }
}

export {
    ProjEdgeAiPanelCtrl as PanelCtrl
};
