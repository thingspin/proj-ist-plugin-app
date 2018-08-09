import { Component, Inject, OnInit, Input }   from '@angular/core';
import { styleUrls }    from '../../utils/app.style';
import { FormData }                   from '../../services/formData/formData.model';
import { FormDataService }            from '../../services/formData/formData.service';
import { FormGroup } from '@angular/forms';

@Component ({
    selector:  'edge-ai-wizard-result',
    template:  require(`./component.html`),
    styleUrls: styleUrls,
})

export class ResultComponent implements OnInit {
    title = 'Confirm & Save your project.';
    @Input() formData: FormData;
    isFormValid: Boolean = false;

    constructor(@Inject(FormDataService) private formDataService: FormDataService) {
    }

    ngOnInit() {
        this.formData = this.formDataService.getFormData();
        this.isFormValid = this.formDataService.isFormValid();
    }
    save(form: FormGroup): void {
    }

    submit() {
        alert('Excellent Job!');
        this.formData = this.formDataService.resetFormData();
        this.isFormValid = false;
    }
}
