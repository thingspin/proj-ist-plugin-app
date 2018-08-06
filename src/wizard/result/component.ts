import { Component, Inject, OnInit, Input }   from '@angular/core';
import { styleUrls }    from '../app.style';
import { FormData }                   from '../data/formData.model';
import { FormDataService }            from '../data/formData.service';

@Component ({
    selector:  'edge-ai-wizard-result',
    template:  require(`./component.html`),
    styleUrls: styleUrls,    
})

export class ResultComponent implements OnInit {
    title = 'Confirm & Save your project.';
    @Input() formData: FormData;
    isFormValid: boolean = false;
    
    constructor(@Inject(FormDataService) private formDataService: FormDataService) {
    }

    ngOnInit() {
        this.formData = this.formDataService.getFormData();
        this.isFormValid = this.formDataService.isFormValid();
    }

    submit() {
        alert('Excellent Job!');
        this.formData = this.formDataService.resetFormData();
        this.isFormValid = false;
    }
}
