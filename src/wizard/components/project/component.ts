import { Component, Inject, OnInit }   from '@angular/core';
import { styleUrls }  from '../../utils/app.style';
import { FormDataService }     from '../../services/formData/formData.service';
import { FormGroup } from '../../../../node_modules/@angular/forms';

@Component ({
    selector:  'edge-ai-wizard-project',
    template:  require(`./component.html`),
    styleUrls: styleUrls,
})
export class ProjectComponent implements OnInit {
    title = 'Please configure Your Inference Project';
    data: any;

    constructor(@Inject(FormDataService) private formDataService: FormDataService) {
    }

    ngOnInit() {
        this.data = this.formDataService.getProject();
    }

    save(form: FormGroup) {
        if (!form.valid) {
            return;
        }

        this.formDataService.setProject(this.data);
    }
}
