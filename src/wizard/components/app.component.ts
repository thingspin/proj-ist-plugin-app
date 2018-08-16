import { getStyleUrls } from '../utils/app.style';
import { enableProdMode, Component, Inject, OnInit, Input } from '@angular/core';
import { FormDataService }  from '../services/formData/formData.service';
import { UIRouter, StateService } from '@uirouter/core';
import { BackendService } from '../services/backendSrv/backendSrv.service';
import { Response } from '@angular/http';
import { Project, Platform, Model } from '../services/formData/formData.model';

enableProdMode();

@Component ({
    selector: 'edge-ai-inference-wizard',
    template: require(`./app.component.html`),
    styleUrls: getStyleUrls()
})
export class AppComponent implements OnInit {
    title: String = 'Wizard';
    $stateService: StateService;
    params: any;
    @Input() formData;

    constructor(
        @Inject(FormDataService) private formDataService: FormDataService,
        @Inject(UIRouter) private router: UIRouter,
        @Inject(BackendService) private backendSrv: BackendService,
        @Inject('$location') private $location,
    ) {
        console.log(this.title + ' constructor!');
    }

    ngOnInit() {
        this.params = this.$location.search();
        this.$stateService = this.router.stateService;
        if (this.params.cid) {
            this.updateEditData(this.params.cid).then( () => {
                this.formData = this.formDataService.getFormData();
                this.$stateService.go("project", this.params);
            });
        } else {
            this.formData = this.formDataService.getFormData();
            this.$stateService.go("project");
        }
        console.log(this.title + ' loaded!');
    }

    updateEditData(cid: string): Promise<any> {
        return this.backendSrv.getConfig(cid).then((res: Response) => {
            return res.json().Result;
        }).then(Result => { return this.setProject(Result);
        }).then(Result => { return this.setPlatform(Result);
        }).then(Result => { return this.setModel(Result);
        }).then(Result => { return this.setAlgorithm(Result);
        });
    }

    setProject(Result): Promise<any> {
        const project: Project = {
            cid: Result.cid,
            name: Result.cname,
        };
        this.formDataService.setProject(project);
        return Promise.resolve(Result);
    }

    setPlatform(Result): Promise<any> {
        const platform: Platform = {
            framework: Result.framework,
        };
        this.formDataService.setPlatform(platform);
        return Promise.resolve(Result);
    }

    setModel(Result): Promise<any> {
        const promiseList = [];
        const { cid } = Result;
        Result.modelFiles.forEach((fileName: string) => {
            promiseList.push( this.backendSrv.getModelFile(cid, fileName));
        });

        return Promise.all(promiseList).then( (files: File[]) => {
            const model: Model = {
                name: Result.model,
                models: Result.modelFiles,
                files,
            };
            this.formDataService.setModel(model);
            return Result;
        });
    }

    setAlgorithm(Result): Promise<any> {
        const promiseList = [];
        const { cid } = Result;
        Result.algorithmFiles.forEach((fileName: string) => {
            promiseList.push( this.backendSrv.getAlgorithmFile(cid, fileName));
        });

        return Promise.all(promiseList).then( (files: File[]) => {
            const algorithm = {
                name: `${Result.algorithmName}${Result.algorithmType}`,
                files,
                algorithm: `${Result.algorithmName}${Result.algorithmType}`,
            };
            this.formDataService.setAlgorithm(algorithm);
            return Result;
        });
    }
}