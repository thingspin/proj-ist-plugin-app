import { Component, Inject, OnInit }   from '@angular/core';
import { styleUrls }  from '../app.style';
import { FormDataService }     from '../data/formData.service';

@Component ({
    selector:  'edge-ai-wizard-project',
    template:  require(`./component.html`),
    styleUrls: styleUrls,
})
export class ProjectComponent implements OnInit {
    title = 'Please configure Your Inference Project';
    data: any;
    form: any;

    constructor(@Inject(FormDataService) private formDataService: FormDataService) {
    }

    ngOnInit() {
        this.data = this.formDataService.getProject();
    }

    save(form: any) {
        if (!form.valid) {
            return;
        }

        this.formDataService.setProject(this.data);
    }
}
