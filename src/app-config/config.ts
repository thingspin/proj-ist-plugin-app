/* Angularjs Libraries */
import { IFormController, IQService, IDeferred, IPromise } from "angular";

/* Grafana Libraries */
import { appEvents } from "grafana/app/core/core";

/* Data Structures */
import { AppModel } from "../monitoring/models/default.model";
interface ConfirmModel {
  text: string;
  title: string;
  yesText: string;
  icon: string;
  onConfirm: Function;
}

export class AppConfigCtrl {
  static template = require("./config.html");
  title: string = String("Edge AI Configurator");
  appEditCtrl: any;
  appModel: AppModel;
  editForm: IFormController;
  suggest: any = {
    storage: {
      base: 'edge',
      data: 'data'
    },
    mqtt: {
      brocker: 'localhost:1883',
      base: 'THINGSPIN/EDGEAI',
      inprefix: 'IN',
      outprefix: 'OUT',
    }
  };

  constructor(private $scope, private $q: IQService) {
  }

  $onInit(): void {
    console.log(this.appModel);
    this.appEditCtrl.setPreUpdateHook(this.preUpdate.bind(this));
    this.appEditCtrl.setPostUpdateHook(this.postUpdate.bind(this));

    this.$scope.$watch('editForm', (form) => {
      this.editForm = form;
    });
  }

  private preUpdate(): IPromise<any> {
    const defer: IDeferred<any> = this.$q.defer();
    let message: ConfirmModel;

    if (this.editForm.$valid) {
      message = {
        title: 'Update Configuration',
        text: 'Do you want to modify to the set value?',
        yesText: "Update",
        icon: "fa-thumbs-o-up",
        onConfirm: (): void => {
          defer.resolve();
        },
      };
    } else {
      message = {
        title: 'not entered set values',
        text: 'There is a set value that is not entered. Do you want to apply it as the default value?',
        yesText: "Update",
        icon: "fa-thumbs-o-down",
        onConfirm: (): void => {
          this.appModel.jsonData = Object.assign({}, this.suggest, this.appModel.jsonData);
          this.appModel.jsonData.mqtt = Object.assign({}, this.suggest.mqtt, this.appModel.jsonData.mqtt);
          this.appModel.jsonData.storage = Object.assign({}, this.suggest.storage, this.appModel.jsonData.storage);
          defer.resolve();
        },
      };
    }
    appEvents.emit('confirm-modal', message);
    return defer.promise;
  }

  private postUpdate(): void {
    this.$q.resolve();
  }
}
