class AppConfigCtrl {
  static template = require("./config.html");
  title: string = "Edge AI Configurator";
  appEditCtrl: any;
  appModel: any;
  editForm: any;
  mqtt: any;
  storage: any;

  suggest: any = {
    storage: {
      base: 'edge',
      data: 'data'
    },
    mqtt: {
      brocker: 'localhost:3306',
      base: 'THINGSPIN/EDGEAI',
      inprefix: 'IN',
      outprefix: 'OUT',
    }
  }; 

  constructor(private $q) {
    this.appEditCtrl.setPreUpdateHook(this.preUpdate.bind(this));
    this.appEditCtrl.setPostUpdateHook(this.postUpdate.bind(this));
  }

  preUpdate() {
    return this.$q.resolve();
  }

  postUpdate() {
    return this.$q.resolve();
  }

}

export {
  AppConfigCtrl
};
