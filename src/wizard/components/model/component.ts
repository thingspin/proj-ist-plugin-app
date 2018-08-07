import $ from "jquery";
import "bootstrap";
import "../../../vendor/customize/bootstrap-fileinput/fileinput";
import { Component, Inject, OnInit }   from '@angular/core';

import { FormDataService } from '../../services/formData/formData.service';
import { FormGroup } from '../../../../node_modules/@angular/forms';
import { defaultFileinputConf } from '../../utils/common';

@Component ({
    selector:  'edge-ai-wizard-model',
    template:  require(`./component.html`),
    styleUrls: [
        'public/plugins/proj-edge-ai-app/css/wizard-model.css',
    ],
})
export class ModelComponent implements OnInit {
    fileInputId: String = "modelFileInput";

    title = 'Upload or select your model.';
    data: any;
    models: FileList;

    constructor(@Inject(FormDataService) private formDataService: FormDataService) {
    }

    ngOnInit() {
        this.data = this.formDataService.getModel();
        $(`#${this.fileInputId}`).fileinput(defaultFileinputConf);
        $(`#${this.fileInputId}`).on("change", ({target: {files}}) => {

            // const validFileExts: String[] = ["data","index", "meta"];
            Array.from(files).forEach( ({name, size}) => {
                const names = name.split(".");
                let assistantName = "";
                names.forEach((name, idx) => {
                    if (idx < (names.length-1) ) {
                        assistantName = `${assistantName}${idx === 0 ? '' : '.'}${name}`;
                    }
                });
                this.data.name = assistantName;
            });
            this.models = files;
        });
        $(`#kvFileinputModal`).hide();
    }

    save(form: FormGroup) {
        if (!form.valid) {
            return;
        }

        this.formDataService.setModel(this.data);
    }
}
