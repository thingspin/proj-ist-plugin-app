import {MetricsPanelCtrl} from  'grafana/app/plugins/sdk';
import _ from 'lodash';

class ThingspinStopControlPanelCtrl extends MetricsPanelCtrl {
  static template = require("./templet.html");
  appInfo = require("../../plugin.json");
  backendSrv: any;
  mqttSrv: any;
  baseUrl: string;
  location: any;

  constructor($scope, $injector,$location,mqttSrv,backendSrv) {
    super($scope, $injector);
    _.defaults(this.panel, {
      hz: 0,
      cam1: {
        "fHour": 0,
        "fMin": 0,
        "tHour": 0,
        "tMin" : 0,
        level : [{level: 1, foam: 0, hz: 0},{level: 2, foam: 0, hz: 0},
          {level: 3, foam: 0, hz: 0},{level: 4, foam: 0, hz: 0},{level: 5, foam: 0, hz: 0}]
      }
      ,
      cam2: {
        "fHour": 0,
        "fMin": 0,
        "tHour": 0,
        "tMin" : 0,
        level : [{level: 1, foam: 0, hz: 0},{level: 2, foam: 0, hz: 0},
          {level: 3, foam: 0, hz: 0},{level: 4, foam: 0, hz: 0},{level: 5, foam: 0, hz: 0}]
      },
      mqttInfo : {
        //brocker: 'localhost:1883',
        base: 'THINGSPIN/IST',
        topic: 'METHOD',
        inprefix: 'IN',
        outprefix: 'OUT',
        routes: this.appInfo["routes"][0],
      },
      state : false
    });
    this.backendSrv = backendSrv;
    this.location = $location;
    this.mqttSrv = mqttSrv;
    this.baseUrl = `ws://${this.location.host()}:${this.location.port()}/api/plugin-proxy/${this.appInfo["id"]}${this.panel.mqttInfo.routes["path"]}`;
    // get mqtt info from the parent app
    this.backendSrv.get(`api/plugins/${this.appInfo["id"]}/settings`).then(result => {
      if (result.hasOwnProperty('jsonData') && result['jsonData'] != null) {
        this.panel.mqttInfo.base = result['jsonData']['base'];
        //this.mqttInfo.brocker = result['jsonData']['brocker'];
        this.panel.mqttInfo.inprefix = result['jsonData']['inprefix'];
        this.panel.mqttInfo.outprefix = result['jsonData']['outprefix'];
        this.baseUrl = `ws://${this.location.host()}:${this.location.port()
                  }/api/plugin-proxy/${this.appInfo["id"]}${this.panel.mqttInfo.routes["path"]}`;
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
    console.log("automatic(1) or manual(0) : " + flag);
    if(this.mqttSrv._client === undefined){
      console.log("MQTT reconnect");
      this.mqttSrv.connect(this.baseUrl);
    }
    let topic;
    if (this.panel.mqttInfo.topic === "") {
      topic = this.panel.mqttInfo.base + "/" + this.panel.mqttInfo.outprefix;
    } else {
      topic = this.panel.mqttInfo.base + "/" + this.panel.mqttInfo.topic + "/" + this.panel.mqttInfo.outprefix;
    }
    let data;
    if (flag === 1) {
      data = {
        "flag": true,
        "cam1": this.panel.cam1,
        "cam2": this.panel.cam2
      };
    } else {
      data = {
        "flag": false,
        "manualHz": this.panel.hz
      };
    }
    this.mqttSrv.publishMessage(topic, JSON.stringify(data), {
        qos: 0,
        retain: true,
        dup: false,
    });
  }

  onInitEditMode() {
     this.addEditorTab('Options', `public/plugins/${this.appInfo["id"]}/panel/thingspin-ist-method-panel/options.html`, 2);
  }

  onDataReceived(dataList) {
   }

  onRender() {
  }

  link(scope, elem, attrs, ctrl) {
  }
}

export {
  ThingspinStopControlPanelCtrl as PanelCtrl
};
