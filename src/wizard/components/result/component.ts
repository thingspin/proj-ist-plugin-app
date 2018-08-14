// Angular Libraries
import { Component, Inject, OnInit, Input }   from '@angular/core';
import { styleUrls }    from '../../utils/app.style';
import * as CustomFormData          from '../../services/formData/formData.model';
import { FormDataService }            from '../../services/formData/formData.service';
import { FormGroup } from '@angular/forms';
import { Http, Response } from '@angular/http';

// Thingspin(grafana) Libraries
import appEvents  from 'grafana/app/core/app_events';

@Component ({
    selector:  'edge-ai-wizard-result',
    template:  require(`./component.html`),
    styleUrls: styleUrls,
})

export class ResultComponent implements OnInit {
    title = 'Confirm & Save your project.';
    sendData: FormData;
    @Input() formData: Object;
    isFormValid: Boolean = false;

    constructor(
        @Inject(FormDataService)    private formDataService:    FormDataService,
        @Inject(Http)               private http:               Http,
    ) {
    }

    ngOnInit(): void {
        const formData: CustomFormData.FormData = this.formDataService.getFormData();
        this.formData = this.getViewData(formData);
        this.sendData = this.getSendData(formData);
        this.isFormValid = this.formDataService.isFormValid();
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
            mlSetting: formData.settings,
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
        data.append("mlSetting", formData.settings);

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

    submit(): void {
        appEvents.emit('confirm-modal', {
            title: 'New Inference Configuration',
            text: 'Are you sure you want to add?',
            yesText: "Add",
            icon: "fa-thumbs-o-up",
            onConfirm: () => {
                this.http.post('/api/ml', this.sendData).subscribe((res: Response) => {
                    console.log(res);
                });
            }
        });
    }
}
