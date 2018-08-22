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
        const inputId: String = `#${this.fileInputId}`;
        this.data = this.formDataService.getModel();

        defaultFileinputConf.browseLabel = this.title;
        $(inputId).fileinput(defaultFileinputConf);
        $(inputId).on("fileloaded", this.onFileinputLoaded.bind(this));
        $(inputId).on('fileremoved', this.onFileinputRemoved.bind(this));
        $(inputId).on('filecleared', this.onFileinputCleared.bind(this));

        $(`#kvFileinputModal`).hide();
        this.temp = this.data.files;
        this.temp.files = [];
        if (this.data.files && this.data.files.length !== 0) {
            const { files }: {files: File[]} = this.data;
            this.data.files = [];
            this.temp.files = files;
            $(`#${this.fileInputId}`).fileinput("readFiles", files);
        }
    }

    save(form: FormGroup): void {
        if (!form.valid) {
            return;
        }
        this.formDataService.setModel(this.data);
    }

    getAssistantModelname(files: File[]): string {
        let assistantName: string = String("");

        files.forEach( ({name, size}: {name: string, size: number} ) => {
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

    onFileinputLoaded(event: any, currFile: File) {
        this.setData($(`#${this.fileInputId}`).fileinput('getFileStack'));
    }

    onFileinputRemoved(event: any, id: String, index: Number) {
        this.setData($(`#${this.fileInputId}`).fileinput('getFileStack'));
    }

    onFileinputCleared(event: any) {
        this.setData([]);
    }

    setData(files: File[]): void {
        this.temp.files = files;
        this.data.files = files;
        this.data.models = this.getfilenames();
        this.data.name = this.getAssistantModelname(this.data.files);

        this.form.controls.files.updateValueAndValidity();
    }

    getfilenames(): string[] {
        const res: string[] = [];
        const { files } = this.data;

        files.forEach( (file: File): void => {
            res.push(file.name);
        });
        return res;
    }
}
