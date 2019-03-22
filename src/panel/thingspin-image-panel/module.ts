import _ from 'lodash';
import {MetricsPanelCtrl} from 'grafana/app/plugins/sdk';

class ThingspinImageCtrl extends MetricsPanelCtrl  {
	static template = require("./module.html");
	appInfo = require("../../plugin.json");
  
  constructor($scope, $injector) {
    super($scope, $injector);
    _.defaults(this.panel, {
			bgimagePath: '',
			bgimage: '',
			imageWidth: 500,
		  imageHeight: 500,
			imageWidthStr: '500px',
			imageHeightStr: '500px',
		});
		//this.appInfo = require("../../plugin.json");
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('panel-initialized', this.render.bind(this));
	  this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
  }
	
  onDataReceived(dataList) {	
		this.render();
  }
  
  onInitEditMode() {
		this.addEditorTab('Options', `public/plugins/${this.appInfo["id"]}/panel/thingspin-image-panel/editor.html`, 2);
  }
	
  link(scope, elem, attrs, ctrl) {

    function render() {
			ctrl.panel.imageWidthStr = ctrl.panel.imageWidth.toString() + "px";
			ctrl.panel.imageHeightStr = ctrl.panel.imageHeight.toString() + "px";
			
			//refresh background image
      ctrl.panel.bgimage = ctrl.panel.bgimagePath + "?";
      ctrl.getTime = new Date().getTime();
    }

    this.events.on('render', function() {
      render();
      ctrl.renderingCompleted();
    });
  }
}

export {
  ThingspinImageCtrl as PanelCtrl
};
