import $ from "jquery";
import "bootstrap";
import "../../../vendor/customize/bootstrap-fileinput/fileinput";
import { Component, Inject, OnInit, ViewChild, }   from '@angular/core';

import { FormDataService } from '../../services/formData/formData.service';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { defaultFileinputConf } from '../../utils/common';
import { Algorithm } from '../../services/formData/formData.model';

@Component ({
    selector:  'edge-ai-wizard-algorithm',
    template:  require(`./component.html`),
    styleUrls: [
        'public/plugins/proj-edge-ai-app/css/wizard-model.css',
    ],
})
export class AlgorithmComponent implements OnInit {
    fileInputId: String = "algorithmFileInput";
    title = 'Upload your inference algorithm script(s)!';

    @ViewChild('form') public form: NgForm;

    data: Algorithm;
    temp: any = {};

    constructor(@Inject(FormDataService) private formDataService: FormDataService) {
    }

    ngOnInit() {
        const inputId = `#${this.fileInputId}`;
        this.data = this.formDataService.getAlgorithm();

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

        this.formDataService.setAlgorithm(this.data);
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

    onFileinputLoaded(event, currFile: File) {
        const convFiles: File[] = $(`#${this.fileInputId}`).fileinput('getFileStack');
        this.temp.files = convFiles;
        this.data.files = convFiles;
        // this.data.algorithm = this.getfilenames();
        this.data.name = this.getAssistantName(this.data.files);

        // Ref : https://dzone.com/articles/how-to-create-custom-validators-in-angular
        this.form.controls.files.setValidators([Validators.required, this.algorithmValidator.bind(this)]);
        this.form.controls.files.updateValueAndValidity();
    }

    onFileinputRemoved(event, id: String, index: Number) {
        const convFiles: File[] = $(`#${this.fileInputId}`).fileinput('getFileStack');
        this.temp.files = convFiles;
        this.data.files = convFiles;
        // this.data.algorithm = this.getfilenames();
        this.form.controls.files.setValidators([Validators.required, this.algorithmValidator.bind(this)]);
        this.form.controls.files.updateValueAndValidity();
    }

    onFileinputCleared(event) {
        this.temp.files = [];
        this.data.files = [];
        // this.data.algorithms = [];
        this.form.controls.files.setValidators([Validators.required, this.algorithmValidator.bind(this)]);
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

    // Ref : https://dzone.com/articles/how-to-create-custom-validators-in-angular
    algorithmValidator(c: FormControl): { [key: string]: boolean } | null {
        if (c.value !== undefined) {
            const files: File[] = c.value;
            let isExistAlgorithmMain: Boolean = false;
            files.forEach((file: File) => {
                if (file.name === "main.py") {
                    isExistAlgorithmMain = true;
                }
            });
            if (!isExistAlgorithmMain) {
                return {
                    isNotExistAlgorithmMain: true
                };
            }
        }
        return null;
    }
}
