import _ from 'lodash';
import {MetricsPanelCtrl} from 'grafana/app/plugins/sdk';

class ThingspinImageProcessingCtrl extends MetricsPanelCtrl  {
	static template = require("./module.html");
	appInfo = require("../../plugin.json");
  mouseXlocation: any;
	mouseYlocation: any;
	
	constructor($scope, $injector) {
    super($scope, $injector);
    _.defaults(this.panel, {
			bgimagePath: '',
			bgimage: '',
			roiParam: {
				roiXlocation: 0,
				roiYlocation: 0,
				roiWidth: 10,
				roiHeight: 10,
				roiThreshold: 100,
			},
			imageWidth: 500,
		  imageHeight: 500,
			imageWidthStr: '500px',
			imageHeightStr: '500px',
			roiXlocationStr: "0px",
			roiYlocationStr: "0px",
		});
		this.appInfo = require("../../plugin.json");
		this.mouseXlocation = 0;
		this.mouseYlocation = 0;
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('panel-initialized', this.render.bind(this));
	  this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
  }
	
	onMouseMove(evt){
		this.mouseXlocation = evt.offsetX;
		this.mouseYlocation = evt.offsetY;
	}

  onDataReceived(dataList) {	
		this.render();
  }
  
  onInitEditMode() {
		this.addEditorTab('Options', `public/plugins/${this.appInfo["id"]}/panel/thingspin-image-processing-panel/editor.html`, 2);
  }
	
  link(scope, elem, attrs, ctrl) {

    function render() {
			//refresh ROI settings
			ctrl.panel.roiXlocationStr = ctrl.panel.roiParam.roiXlocation.toString() + "px";
			ctrl.panel.roiYlocationStr = ctrl.panel.roiParam.roiYlocation.toString() + "px";
			ctrl.panel.imageWidthStr = ctrl.panel.imageWidth.toString() + "px";
			ctrl.panel.imageHeightStr = ctrl.panel.imageHeight.toString() + "px";
			
			//refresh background image
			ctrl.panel.bgimage = ctrl.panel.bgimagePath + "?";
			ctrl.getTime = +new Date().getTime();
    }

    this.events.on('render', function() {
      render();
      ctrl.renderingCompleted();
    });
  }
}

export {
  ThingspinImageProcessingCtrl as PanelCtrl
};
