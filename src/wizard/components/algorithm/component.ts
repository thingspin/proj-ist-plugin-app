import $ from "jquery";
import "bootstrap";
import "../../../vendor/customize/bootstrap-fileinput/fileinput";
import { Component, Inject, OnInit, ViewChild, }   from '@angular/core';

import { FormDataService } from '../../services/formData/formData.service';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { SelectComponent, SelectItem } from 'ng2-select';
import { defaultFileinputConf } from '../../utils/common';
import { Algorithm } from '../../services/formData/formData.model';


@Component ({
    selector:  'edge-ai-wizard-algorithm',
    template:  require(`./component.html`),
    styleUrls: [
        'public/plugins/proj-edge-ai-app/css/wizard-algorithm.css',
    ],
})
export class AlgorithmComponent implements OnInit {
    fileInputId: String = "algorithmFileInput";
    title = 'Upload your inference algorithm script(s)!';

    public assistantfilenames: Array<string> = [];
    @ViewChild('form') public form: NgForm;
    @ViewChild('algorithmMain') public select: SelectComponent;

    data: Algorithm;
    temp: any = {};
    selectActive: any[] = [];

    constructor(@Inject(FormDataService) private formDataService: FormDataService) { }

    ngOnInit() {
        const inputId: String = `#${this.fileInputId}`;
        this.data = this.formDataService.getAlgorithm();

        if (this.data.algorithm) {
            const { algorithm } = this.data;
            this.selectActive = [{
                id: algorithm,
                text: algorithm
            }];
        }

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

    private onFileinputLoaded(event, currFile: File) {
        const convFiles: File[] = $(`#${this.fileInputId}`).fileinput('getFileStack');
        this.temp.files = convFiles;
        this.data.files = convFiles;
        this.assistantfilenames = this.getCurrFilenames();

        // Ref : https://dzone.com/articles/how-to-create-custom-validators-in-angular
        this.form.controls.files.setValidators([Validators.required, this.algorithmValidator.bind(this)]);
        this.form.controls.files.updateValueAndValidity();
    }

    private onFileinputRemoved(event, id: String, index: Number) {
        const convFiles: File[] = $(`#${this.fileInputId}`).fileinput('getFileStack');
        this.temp.files = convFiles;
        this.data.files = convFiles;
        this.assistantfilenames = this.getCurrFilenames();

        this.form.controls.files.setValidators([Validators.required, this.algorithmValidator.bind(this)]);
        this.form.controls.files.updateValueAndValidity();
    }

    private onFileinputCleared(event) {
        this.temp.files = [];
        this.data.files = [];
        this.assistantfilenames = this.getCurrFilenames();

        this.form.controls.files.setValidators([Validators.required, this.algorithmValidator.bind(this)]);
        this.form.controls.files.updateValueAndValidity();
    }

    getCurrFilenames(): Array<string> {
        const res: Array<string> = [];
        const {files} = this.data;

        files.forEach( ({name}) => {
            res.push(name);
        });
        return res;
    }

    // Ref : https://dzone.com/articles/how-to-create-custom-validators-in-angular
    algorithmValidator(c: FormControl): { [key: string]: boolean } | null {
        if (c.value !== undefined) {
            // const files: File[] = c.value;

            // let isExistAlgorithmMain: Boolean = false;
            // files.forEach(({name}) => {
            //     if (name === "main.py") {
            //         isExistAlgorithmMain = true;
            //     }
            // });

            // if (!isExistAlgorithmMain) {
            //     return {
            //         isNotExistAlgorithmMain: true
            //     };
            // }
        }
        return null;
    }

    public selected(value: any): void {
        console.log('Selected value is: ', value);
    }

    public removed(value: any): void {
        console.log('Removed value is: ', value);
    }

    public typed(value: any): void {
        console.log('New search input: ', value);
    }

    public refreshValue(value: SelectItem): void {
        this.selectActive = [value];
        this.data.algorithm = value.text;
    }
}
