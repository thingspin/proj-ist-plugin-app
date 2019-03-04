import {MetricsPanelCtrl} from  'grafana/app/plugins/sdk';

class ThingspinDeviceControlPanelCtrl extends MetricsPanelCtrl {
  static template = require("./templet.html");
  appInfo = require("../../plugin.json");
  
  backendSrv: any;
  
  mqttSrv: any;
  baseUrl: string;
  mqttInfo: any;

  location: any;

  constructor($scope, $injector,$location,mqttSrv,backendSrv) {
    super($scope, $injector);
    this.backendSrv = backendSrv;
    this.location = $location;
    this.mqttInfo = {
        //brocker: 'localhost:1883',
        base: 'THINGSPIN/IST',
        topic: '',
        inprefix: 'IN',
        outprefix: 'OUT',
        routes:this.appInfo["routes"][0]
    }
    this.mqttSrv = mqttSrv;
    
    this.baseUrl = `ws://${this.location.host()}:${this.location.port()}/api/plugin-proxy/${this.appInfo["id"]}${this.mqttInfo.routes["path"]}`;
    
    // get mqtt info from the parent app
    this.backendSrv.get(`api/plugins/${this.appInfo["id"]}/settings`).then(result => {  
      if (result.hasOwnProperty('jsonData')) {
        this.mqttInfo.base = result['jsonData']['base'];
        //this.mqttInfo.brocker = result['jsonData']['brocker'];
        this.mqttInfo.inprefix = result['jsonData']['inprefix'];
        this.mqttInfo.outprefix = result['jsonData']['outprefix'];
        this.baseUrl = `ws://${this.location.host()}:${this.location.port()}/api/plugin-proxy/${this.appInfo["id"]}${this.mqttInfo.routes["path"]}`;
      }
    });

    this.mqttSrv.connect(this.baseUrl);

    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('render', this.onRender.bind(this));
    this.events.on('panel-initialized', this.onRender.bind(this));
    this.events.on('data-received', this.onDataReceived.bind(this));
  }

  OnInitialized() {
  }

  onClicked(flag) {
    console.log("mqtt start : " + flag);
    let topic;
    
    if (this.mqttInfo.topic == "") {
      topic = this.mqttInfo.base + "/" + this.mqttInfo.outprefix;
    } else {
      topic = this.mqttInfo.base + "/" + this.mqttInfo.topic + "/" + this.mqttInfo.outprefix;
    }
    let data = {
      "flag":flag
    }
    this.mqttSrv.publishMessage(topic, JSON.stringify(data), {
        qos: 0,
        retain: true,
        dup: false,
    });
  }

  onInitEditMode() {
     this.addEditorTab('Options', `public/plugins/${this.appInfo["id"]}/panel/thingspin-device-control-panel/options.html`, 2);
  }

  onDataReceived(dataList) {
   }

  onRender() {
  }
  
  link(scope, elem, attrs, ctrl) {
  }
}

export {
  ThingspinDeviceControlPanelCtrl as PanelCtrl
};
