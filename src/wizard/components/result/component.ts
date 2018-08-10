import { Component, Inject, OnInit, Input }   from '@angular/core';
import { styleUrls }    from '../../utils/app.style';
import * as CustomFormData          from '../../services/formData/formData.model';
import { FormDataService }            from '../../services/formData/formData.service';
import { FormGroup } from '@angular/forms';
import { Http, Response } from '@angular/http';

@Component ({
    selector:  'edge-ai-wizard-result',
    template:  require(`./component.html`),
    styleUrls: styleUrls,
})

export class ResultComponent implements OnInit {
    title = 'Confirm & Save your project.';
    @Input() formData: CustomFormData.FormData;
    isFormValid: Boolean = false;

    constructor(@Inject(FormDataService) private formDataService: FormDataService,
        // @Inject('backendSrv') private backendSrv,
        @Inject(Http) private http: Http ) {
    }

    ngOnInit() {
        this.formData = this.formDataService.getFormData();
        this.isFormValid = this.formDataService.isFormValid();
    }
    save(form: FormGroup): void {
    }

    submit() {
        alert('Excellent Job!');
        const data = new FormData();
        data.append("cid", this.formData.project.cid);
        data.append("cname",this.formData.project.name);
        data.append("model",this.formData.model.name);
        data.append("framework",this.formData.platform.framework);
        data.append("inputInfo",this.formData.project.inputInfo);
        data.append("outputInfo",this.formData.project.outputInfo);
        data.append("algorithmType",".py");
        data.append("algorithmName",this.formData.algorithm.name);

        for (let file of this.formData.model.files) {
            data.append('model[]', file);
        }
        for (let file of this.formData.algorithm.files) {
            data.append('algorithm[]', file);
        }
        this.http.post('/api/ml', data).subscribe((res: Response) => {
            console.log(res);
        });
    }
}
