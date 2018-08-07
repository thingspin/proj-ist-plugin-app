import { Component, Inject, OnInit } from '@angular/core';
import { styleUrls }  from '../../utils/app.style';
import { FormDataService }     from '../../services/formData/formData.service';
import { Algorithm } from '../../services/formData/formData.model';

@Component ({
    selector:  'edge-ai-wizard-algorithm',
    template:  require(`./component.html`),
    styleUrls: styleUrls,
})
export class AlgorithmComponent implements OnInit {
    title = 'Upload your inference algorithm script(s)!';
    data: Algorithm;

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
