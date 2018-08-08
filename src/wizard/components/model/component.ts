import $ from "jquery";
import "bootstrap";
import "../../../vendor/customize/bootstrap-fileinput/fileinput";
import { Component, Inject, OnInit, ViewChild, }   from '@angular/core';

import { FormDataService } from '../../services/formData/formData.service';
import { FormGroup, NgForm } from '@angular/forms';
import { defaultFileinputConf } from '../../utils/common';
import { Model } from '../../services/formData/formData.model';
// import { ICustomFile } from "file-input-accessor";
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

    getAssistantName(files: File[]): String {
        let assistantName = "";

        Array.from(files).forEach( ({name, size}) => {
            assistantName = "";
            const names = name.split(".");
            names.forEach((name, idx) => {
                if (idx < (names.length-1) ) {
                    assistantName = `${assistantName}${idx === 0 ? '' : '.'}${name}`;
                }
            });
        });

        return assistantName;
    }

    onFileinputLoaded(event, currFile) {
        const convFiles: File[] = $(`#${this.fileInputId}`).fileinput('getFileStack');
        this.temp.files = convFiles;
        this.data.files = convFiles;
        this.data.models = this.getfilenames();
        this.data.name = this.getAssistantName(this.data.files);
        this.form.controls.files.updateValueAndValidity();
    }

    onFileinputRemoved(event, id, index) {
        const convFiles: File[] = $(`#${this.fileInputId}`).fileinput('getFileStack');
        this.temp.files = convFiles;
        this.data.files = convFiles;
        this.data.models = this.getfilenames();
        this.form.controls.files.updateValueAndValidity();
    }

    onFileinputCleared(event) {
        this.temp.files = [];
        this.data.files = [];
        this.data.models = [];
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
