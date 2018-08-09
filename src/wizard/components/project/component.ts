import { Component, Inject, OnInit }   from '@angular/core';
import { styleUrls }  from '../../utils/app.style';
import { FormDataService }     from '../../services/formData/formData.service';
import { FormGroup } from '@angular/forms';
import { Guid } from "guid-typescript";
import { Project } from '../../services/formData/formData.model';

@Component ({
    selector:  'edge-ai-wizard-project',
    template:  require(`./component.html`),
    styleUrls: styleUrls,
})
export class ProjectComponent implements OnInit {
    title = 'Please configure Your Inference Project';
    data: Project;

    constructor(
        @Inject(FormDataService) private formDataService: FormDataService,
        @Inject('appModel') private appModel,
    ) { }

    ngOnInit() {
        this.formDataService.setSettings(this.appModel.jsonData);
        this.data = this.formDataService.getProject();
    }

    save(form: FormGroup) {
        if (!form.valid) {
            return;
        }
        if (!this.data.cid) {
            const guid = Guid.create();
            this.data.cid = `${guid}`;
            this.data.inputInfo = `thingspin/edge-ai/in/${guid}`;
            this.data.outputInfo = `thingspin/edge-ai/output/${guid}`;
        }

        this.formDataService.setProject(this.data);
    }
}
