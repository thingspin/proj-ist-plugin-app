import { Component, Inject, OnInit }   from '@angular/core';
import { styleUrls }  from '../../utils/app.style';
import { FormDataService }     from '../../services/formData/formData.service';
import { FormGroup } from '@angular/forms';
import { Platform } from '../../services/formData/formData.model';

@Component ({
    selector:  'edge-ai-wizard-platform',
    template:  require(`./component.html`),
    styleUrls: styleUrls,
})
export class PlatformComponent implements OnInit {
    title = 'Which platform will be used for?';
    data: Platform;

    constructor(@Inject(FormDataService) private formDataService: FormDataService) {
    }

    ngOnInit() {
        this.data = this.formDataService.getPlatform();
    }

    save(form: FormGroup) {
        if (!form.valid) {
            return;
        }

        this.formDataService.setPlatform(this.data);
    }
}
