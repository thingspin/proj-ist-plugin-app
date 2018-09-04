/* Angular Libraries */
import { Component, Inject, OnInit, ViewChild }   from '@angular/core';
import { FormGroup, NgForm, Validators, FormControl, NgModel } from '@angular/forms';
import { getStyleUrls }  from '../../utils/app.style';
import { Response } from '@angular/http';

/* Custom Services */
import { FormDataService }     from '../../services/formData/formData.service';
import { BackendService } from '../../services/backendSrv/backendSrv.service';

/* Data Structs */
import { Project } from '../../services/formData/formData.model';
import { InferenceConfig } from 'monitoring/models/default.model';

@Component ({
    selector:  'edge-ai-wizard-project',
    template:  require(`./component.html`),
    styleUrls: getStyleUrls(),
})
export class ProjectComponent implements OnInit {
    title = 'Please configure Your Inference Project';

    savedConfigs: any = {};
    data: Project;
    @ViewChild('form') public form: NgForm;
    @ViewChild('name') public nameFormCtrl: NgModel;

    constructor(
        @Inject(FormDataService) private formDataService: FormDataService,
        @Inject(BackendService) private backendSrv: BackendService,
        @Inject('appModel') private appModel,
    ) {
    }

    ngOnInit() {
        this.formDataService.setSettings(this.appModel.jsonData);
        this.data = this.formDataService.getProject();
        this.backendSrv.getConfigList().then( (res: Response): void => {
            const { Result }: { Result: any } = res.json();
            this.savedConfigs = Result;
        });
        this.nameFormCtrl.control.setValidators([Validators.required, this.nameValidator.bind(this)]);
    }

    private nameValidator(c: FormControl): { [key: string]: boolean } | null {
        if (c.value !== undefined) {
            const projectName: string = c.value;

            for (let cid in this.savedConfigs) {
                const config: InferenceConfig = this.savedConfigs[cid];
                if ( config.cname === projectName) {
                    return {
                        isExistName: true,
                    };
                }
            }
        }
        return null;
    }

    private generateUID(): string {
        // I generate the UID from two parts here
        // to ensure the random number provide enough bits.
        var n1 = (Math.random() * 46656) | 0;
        var n2 = (Math.random() * 46656) | 0;
        let firstPart = ("000" + n1.toString(36)).slice(-3);
        let secondPart = ("000" + n2.toString(36)).slice(-3);
        return firstPart + secondPart;
    }

    public save(form: FormGroup) {
        if (!form.valid) {
            return;
        }
        if (!this.data.cid) {
            const guid = this.generateUID();
            this.data.cid = `${guid}`;
        }

        this.formDataService.setProject(this.data);
    }
}
