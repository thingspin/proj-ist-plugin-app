// Angular Libraries
import { Component, Inject, OnInit, Input }   from '@angular/core';
import { getStyleUrls }    from '../../utils/app.style';
import * as CustomFormData          from '../../services/formData/formData.model';
import { FormDataService }            from '../../services/formData/formData.service';
import { FormGroup } from '@angular/forms';
import { Http, Response } from '@angular/http';

// Thingspin(grafana) Libraries
import appEvents  from 'grafana/app/core/app_events';
import { MqttService } from '../../services/mqtt/mqttSrv.service';
import { BackendService } from '../../services/backendSrv/backendSrv.service';

@Component ({
    selector:  'edge-ai-wizard-result',
    template:  require(`./component.html`),
    styleUrls: getStyleUrls(),
})

export class ResultComponent implements OnInit {
    title = 'Confirm & Save your project.';
    sendData: FormData;
    mqttData: CustomFormData.MqttSendData;
    @Input() formData: Object;
    isFormValid: Boolean = false;
    isNew: Boolean;

    constructor(
        @Inject(FormDataService)    private formDataService:    FormDataService,
        @Inject(Http)               private http:               Http,
        @Inject(MqttService) private mqttSrv: MqttService,
        @Inject('$location') private $location,
        @Inject('appModel') private appModel,
        @Inject(BackendService) private backendSrv: BackendService,
    ) {
    }

    ngOnInit(): void {
        const formData: CustomFormData.FormData = this.formDataService.getFormData();
        this.formData = this.getViewData(formData);
        this.sendData = this.getSendData(formData);
        this.isFormValid = this.formDataService.isFormValid();
        const { cid } = this.$location.search();
        this.isNew = (cid) ? false : true;

        const urlPath = "/mqtt";
        const baseUrl = `ws://${this.$location.host()}:${this.$location.port()}/api/plugin-proxy/${this.appModel.id}`;
        this.mqttSrv.connect(`${baseUrl}${urlPath}`);
    }

    getViewData(formData: CustomFormData.FormData): Object {

        const names: String[] = formData.algorithm.name.split(".");
        const algorithmType = `.${names[names.length-1]}`;

        // Ref : https://stackoverflow.com/questions/14727044/typescript-difference-between-string-and-string
        let algorithmName: string = String("");
        names.forEach( (name: String, idx: Number) => {
            if (idx < (names.length-1) ) {
                algorithmName = `${algorithmName}${idx === 0 ? '' : '.'}${name}`;
            }
        });

        let data: Object = {
            cid: formData.project.cid,
            cname: formData.project.name,
            model: formData.model.name,
            framework: formData.platform.framework,
            // inputInfo: formData.project.inputInfo,
            // outputInfo: formData.project.outputInfo,
            mlSetting: JSON.stringify(formData.settings),
            algorithmType,
            algorithmName,
            'model[]': [],
            'algorithm[]': [],
        };
        for (let file of formData.model.files) {
            data['model[]'].push(file);
        }
        for (let file of formData.algorithm.files) {
            data['algorithm[]'].push(file);
        }

        return data;
    }

    getSendData(formData: CustomFormData.FormData): FormData {
        const data = new FormData();
        data.append("cid",  formData.project.cid);
        data.append("cname", formData.project.name);
        data.append("model", formData.model.name);
        data.append("framework", formData.platform.framework);
        // data.append("inputInfo", formData.project.inputInfo);
        // data.append("outputInfo", formData.project.outputInfo);
        data.append("mlSetting", JSON.stringify(formData.settings));

        const names: String[] = formData.algorithm.name.split(".");
        const algorithmType = `.${names[names.length-1]}`;
        let assistantName: string = String("");
        names.forEach( (name: String, idx: Number) => {
            if (idx < (names.length-1) ) {
                assistantName = `${assistantName}${idx === 0 ? '' : '.'}${name}`;
            }
        });
        data.append("algorithmType",algorithmType);
        data.append("algorithmName",assistantName);

        for (let file of formData.model.files) {
            data.append('model[]', file);
        }
        for (let file of formData.algorithm.files) {
            data.append('algorithm[]', file);
        }
        return data;
    }
    save(form: FormGroup): void {
    }

    submit(isNew: Boolean): void {
        if (isNew) {
            appEvents.emit('confirm-modal', {
                title: 'New Inference Configuration',
                text: 'Are you sure you want to add?',
                yesText: "Add",
                icon: "fa-thumbs-o-up",
                onConfirm: () => {
                    this.http.post('/api/ml', this.sendData).subscribe((res: Response) => {
                        this.mqttPublish().then(() => {
                            window.location.href = "/plugins/proj-edge-ai-app/page/monitoring";
                        }).catch(err => {
                            console.error(err);
                        });
                    });
                }
            });
        } else {
            const { cid } = this.$location.search();
            appEvents.emit('confirm-modal', {
                title: 'Edit Inference Configuration',
                text: 'Are you sure you want to Edit?',
                yesText: "Edit",
                icon: "fa-thumbs-o-up",
                onConfirm: () => {
                    this.http.put(`/api/ml/${cid}`, this.sendData).subscribe((res: Response) => {
                        this.mqttPublish().then(() => {
                            window.location.href = "/plugins/proj-edge-ai-app/page/monitoring";
                        }).catch( (err) => {
                            console.error(err);
                        });
                    });
                }
            });
        }
    }

    mqttPublish(): Promise<any> {
        const topic = `config`;
        return this.backendSrv.getConfigList().then( (res: Response) => {
           return this.mqttSrv.publishMessage(topic, JSON.stringify(res.json().Result), {
                qos: 0,
                retain: true,
                dup: false,
            });
        });
    }

}
