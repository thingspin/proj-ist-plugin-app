//import appEvents from 'grafana/app/core/app_events';

class AppConfigCtrl {
  static template = require("./config.html");
  appEditCtrl: any;
  mqttSrv: any;
  mqtt: any;
  appModel: any;

  constructor(private $q) {
    this.mqtt = {
      //brocker: 'localhost:1883',
      base: 'THINGSPIN/IST',
      inprefix: 'IN',
      outprefix: 'OUT',
    }
    this.appEditCtrl.setPreUpdateHook(this.preUpdate.bind(this));
    this.appEditCtrl.setPostUpdateHook(this.postUpdate.bind(this));
  }

  preUpdate() {
    console.log("=====preUpdate!");
    this.appModel.jsonData = Object.assign({}, this.mqtt, this.appModel.jsonData);
    console.log(this.appModel);
    /*
    let message = {
      title: 'Update Configuration',
      text: 'Do you want to modify to the set value?',
      yesText: "Update",
      icon: "fa-thumbs-o-up",
      onConfirm: (): void => {
        this.$q.resolve();
      },
    };
    
    appEvents.emit('confirm-modal', message);
*/
    return this.$q.resolve();
  }

  postUpdate() {
    console.log("=====postUpdate!");
    this.appModel.jsonData = Object.assign({}, this.mqtt, this.appModel.jsonData);
    console.log(this.appModel);
    this.$q.resolve();
  }
}

export {
  AppConfigCtrl
};
