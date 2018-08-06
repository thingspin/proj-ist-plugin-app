import { Component, Inject, OnInit }    from '@angular/core';
import { styleUrls }    from '../app.style';
import { FormDataService }  from '../data/formData.service';

@Component ({
    selector:  'edge-ai-wizard-input',
    template:  require(`./component.html`),
    styleUrls: styleUrls,
})
export class InputComponent implements OnInit {
    title = 'Input data';
    data: any;
    form: any;
    
    constructor(@Inject(FormDataService) private formDataService: FormDataService) {
    }

    ngOnInit() {
        this.data = this.formDataService.getInput();
    }

    save(form: any) {
        if (!form.valid) 
            return;

        this.formDataService.setInput(this.data);
    }
}
