import { Component, Inject, OnInit }   from '@angular/core';
import { getStyleUrls }  from '../../utils/app.style';
import { FormDataService }     from '../../services/formData/formData.service';
import { FormGroup } from '@angular/forms';
import { Project } from '../../services/formData/formData.model';

@Component ({
    selector:  'edge-ai-wizard-project',
    template:  require(`./component.html`),
    styleUrls: getStyleUrls(),
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

    generateUID() {
        // I generate the UID from two parts here 
        // to ensure the random number provide enough bits.
        var n1 = (Math.random() * 46656) | 0;
        var n2 = (Math.random() * 46656) | 0;
        let firstPart = ("000" + n1.toString(36)).slice(-3);
        let secondPart = ("000" + n2.toString(36)).slice(-3);
        return firstPart + secondPart;
    }

    save(form: FormGroup) {
        if (!form.valid) {
            return;
        }
        if (!this.data.cid) {
            const guid = this.generateUID();
            this.data.cid = `${guid}`;
        }

        this.formDataService.setProject(this.data);
    }
}
