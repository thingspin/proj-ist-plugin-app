import $ from "jquery";
import "bootstrap";
import "../../../vendor/customize/bootstrap-fileinput/fileinput";
import { Component, Inject, OnInit, ViewChild, }   from '@angular/core';

import { FormDataService } from '../../services/formData/formData.service';
import { FormGroup, NgForm } from '@angular/forms';
import { defaultFileinputConf } from '../../utils/common';
import { Model } from '../../services/formData/formData.model';

@Component ({
    selector:  'edge-ai-wizard-model',
    template:  require(`./component.html`),
    styleUrls: [
        'public/plugins/proj-edge-ai-app/css/wizard-model.css',
    ],
})
export class ModelComponent implements OnInit {
    fileInputId: String = "modelFileInput";

    @ViewChild('form') public form: NgForm;

    title = 'Upload or select your model.';
    data: Model;
    temp: any = {};

    constructor(@Inject(FormDataService) private formDataService: FormDataService) {
    }

    ngOnInit() {
        const inputId = `#${this.fileInputId}`;
        this.data = this.formDataService.getModel();

        $(inputId).fileinput(defaultFileinputConf);
        $(inputId).on("fileloaded", this.onFileinputLoaded.bind(this));
        $(inputId).on('fileremoved', this.onFileinputRemoved.bind(this));
        $(inputId).on('filecleared', this.onFileinputCleared.bind(this));

        $(`#kvFileinputModal`).hide();
        this.temp = this.data.files;
        this.temp.files = [];
        if (this.data.files && this.data.files.length !== 0) {
            const { files } = this.data;
            this.data.files = [];
            this.temp.files = files;
            $(`#${this.fileInputId}`).fileinput("readFiles", files);
            $(`#${this.fileInputId}`).fileinput('refresh');
        }
    }

    save(form: FormGroup) {
        if (!form.valid) {
            return;
        }
        this.formDataService.setModel(this.data);
    }

    getAssistantModelname(files: File[]): String {
        let assistantName = "";

        Array.from(files).forEach( ({name, size}) => {
            assistantName = "";
            const names: String[] = name.split(".");
            names.forEach( (name: String, idx: Number) => {
                if (idx < (names.length-1) ) {
                    assistantName = `${assistantName}${idx === 0 ? '' : '.'}${name}`;
                }
            });
        });

        return assistantName;
    }

    onFileinputLoaded(event, currFile: File) {
        this.setData({
            files: $(`#${this.fileInputId}`).fileinput('getFileStack'),
            models: this.getfilenames(),
            name: this.getAssistantModelname(this.data.files),
        });
        this.form.controls.files.updateValueAndValidity();
    }

    onFileinputRemoved(event, id: String, index: Number) {
        this.setData({
            files: $(`#${this.fileInputId}`).fileinput('getFileStack'),
            models: this.getfilenames(),
            name: this.getAssistantModelname(this.data.files),
        });
    }

    onFileinputCleared(event) {
        this.setData({
            files: [],
            models: [],
            name: '',
        });
    }

    setData(data: Model) {
        this.temp.files = data.files;
        this.data = data;
        this.form.controls.files.updateValueAndValidity();
    }

    getfilenames(): String[] {
        const res: String[] = [];
        const {files} = this.data;

        files.forEach( (file) => {
            res.push(file.name);
        });
        return res;
    }
}
