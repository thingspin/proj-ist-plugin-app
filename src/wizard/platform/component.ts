import { Component, Inject, OnInit }   from '@angular/core';
import { styleUrls }  from '../app.style';
import { FormDataService }     from '../data/formData.service';

@Component ({
    selector:  'edge-ai-wizard-platform',
    template:  require(`./component.html`),
    styleUrls: styleUrls,    
})
export class PlatformComponent implements OnInit {
    title = 'Which platform will be used for?';
    data: any;
    form: any;
    
    constructor(@Inject(FormDataService) private formDataService: FormDataService) {
    }

    ngOnInit() {
        this.data = this.formDataService.getPlatform();
    }

    save(form: any) {
        if (!form.valid) 
            return;

        this.formDataService.setPlatform(this.data);
    }
}