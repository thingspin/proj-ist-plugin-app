import { getStyleUrls } from '../utils/app.style';
import { enableProdMode, Component, Inject, OnInit, Input } from '@angular/core';
import { FormDataService }  from '../services/formData/formData.service';
import { UIRouter, StateService } from '@uirouter/core';
import { BackendService } from '../services/backendSrv/backendSrv.service';
import { Response } from '@angular/http';
import { Project, Platform, Model } from '../services/formData/formData.model';

enableProdMode();

interface QueryResult {
    cid: string;
    cname: string;

    framework: string;
    mlSetting: string;

    model: string;
    modelFiles: string[];

    algorithmName: string;
    algorithmType: string;
    algorithmFiles: string[];
}

@Component ({
    selector: 'edge-ai-inference-wizard',
    template: require(`./app.component.html`),
    styleUrls: getStyleUrls()
})
export class AppComponent implements OnInit {
    title: String = 'Wizard';
    params: any;
    @Input() formData;

    constructor(
        @Inject(FormDataService) private formDataService: FormDataService,
        @Inject(UIRouter) private router: UIRouter,
        @Inject(BackendService) private backendSrv: BackendService,
        @Inject('$location') private $location,
    ) { }

    ngOnInit() {
        const $stateService: StateService = this.router.stateService;

        console.log(this.title + ' loaded!');
        const params: any = this.$location.search();
        if (params.cid) {
            // Edit mode
            this.updateEditData(params.cid).then( () => {
                this.formData = this.formDataService.getFormData();
                $stateService.go("project", params);
            });
        } else {
            // new mode
            this.formData = this.formDataService.getFormData();
            $stateService.go("project");
        }
    }

    updateEditData(cid: string): Promise<any> {
        return this.backendSrv.getConfig(cid).then((res: Response) =>
            res.json().Result
        ).then(Result => this.setProject(Result)
        ).then(Result => this.setPlatform(Result)
        ).then(Result => this.setModel(Result)
        ).then(Result => this.setAlgorithm(Result)
        );
    }

    setProject(Result: QueryResult): Promise<QueryResult> {
        const project: Project = {
            cid: Result.cid,
            name: Result.cname,
        };
        this.formDataService.setProject(project);
        return Promise.resolve(Result);
    }

    setPlatform(Result: QueryResult): Promise<QueryResult> {
        const platform: Platform = {
            framework: Result.framework,
        };
        this.formDataService.setPlatform(platform);
        return Promise.resolve(Result);
    }

    setModel(Result: QueryResult): Promise<QueryResult> {
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

    setAlgorithm(Result: QueryResult): Promise<QueryResult> {
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
