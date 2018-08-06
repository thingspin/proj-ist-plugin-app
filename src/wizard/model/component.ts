import { Component, Inject, OnInit }   from '@angular/core';

import { styleUrls }  from '../app.style';
import { FormDataService } from '../data/formData.service';


@Component ({
    selector:  'edge-ai-wizard-model',
    template:  require(`./component.html`),
    styleUrls: styleUrls,    
})
export class ModelComponent implements OnInit {
    title = 'Upload or select your model.';
    data: any;
    form: any;

    constructor(@Inject(FormDataService) private formDataService: FormDataService) {
    }

    ngOnInit() {
        this.data = this.formDataService.getModel();
        console.log('Model feature loaded!');
    }

    save(form: any) {
        if (!form.valid) 
            return;

        this.formDataService.setModel(this.data);
    }
}