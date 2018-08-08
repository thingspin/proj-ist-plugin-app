import { Inject, Injectable }                        from '@angular/core';

import { FormData, Project, Platform, Model, Algorithm }       from './formData.model';
import { StepService }                   from '../step/step.service';
import { STEPS }                             from '../step/step.model';

@Injectable()
export class FormDataService {

    private data: FormData = new FormData();

    private isProjectFormValid: Boolean = false;
    private isPlatformFormValid: Boolean = false;
    private isModelFormValid: Boolean = false;
    private isAlgorithmFormValid: Boolean = false;

    constructor(@Inject(StepService) private workflowService: StepService) {
    }

    setSettings(data: any) {
        this.data.settings = data;
    }

    getProject(): Project {
        return this.data.project;
    }

    setProject(data: Project) {
        this.isProjectFormValid = true;

        this.data.project = data;

        this.workflowService.validateStep(STEPS.project);
    }

    getPlatform(): Platform {
        return this.data.platform;
    }

    setPlatform(platform: Platform) {
        this.isPlatformFormValid = true;
        this.data.platform = platform;
        this.workflowService.validateStep(STEPS.platform);
    }

    getModel(): Model {
        return this.data.model;
    }

    setModel(model: Model) {
        this.isModelFormValid = true;

        this.data.model = model;
        this.workflowService.validateStep(STEPS.model);
    }

    getAlgorithm(): Algorithm {
        return this.data.algorithm;
    }

    setAlgorithm(algorithm: Algorithm) {
        this.isAlgorithmFormValid = true;

        this.data.algorithm = algorithm;

        this.workflowService.validateStep(STEPS.algorithm);
    }

    getFormData(): FormData {
        return this.data;
    }

    resetFormData(): FormData {

        this.workflowService.resetSteps();

        this.data.clear();

        this.isProjectFormValid
        = this.isPlatformFormValid
        = this.isModelFormValid
        = this.isAlgorithmFormValid
        = false;

        return this.data;
    }

    isFormValid() {
        return this.isProjectFormValid &&
                this.isPlatformFormValid &&
                this.isModelFormValid &&
                this.isAlgorithmFormValid;
    }
}
