import { Component, Inject, OnInit } from '@angular/core';
import { styleUrls }  from '../app.style';
import { FormDataService }     from '../data/formData.service';

@Component ({
    selector:  'edge-ai-wizard-algorithm',
    template:  require(`./component.html`),
    styleUrls: styleUrls,
})
export class AlgorithmComponent implements OnInit {
    title = 'Upload your inference algorithm script(s)!';
    data: any;
    form: any;

    constructor(@Inject(FormDataService) private formDataService: FormDataService) {
    }

    ngOnInit() {
        this.data = this.formDataService.getAlgorithm();
    }

    save(form: any) {
        if (!form.valid) {
            return;
        }

        this.formDataService.setAlgorithm(this.data);
    }
}
