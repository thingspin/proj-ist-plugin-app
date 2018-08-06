import { Inject, Injectable }           from '@angular/core';

import { FormData, Project, Platform,
        Input, Model, Algorithm }       from './formData.model';
import { WorkflowService }              from '../workflow/workflow.service';
import { STEPS }                        from '../workflow/workflow.model';

@Injectable()
export class FormDataService {

    private data: FormData = new FormData();

    private isProjectFormValid: Boolean = false;
    private isInputFormValid: Boolean = false;
    private isPlatformFormValid: Boolean = false;
    private isModelFormValid: Boolean = false;
    private isAlgorithmFormValid: Boolean = false;

    constructor(@Inject(WorkflowService) private workflowService: WorkflowService) {
    }

    getProject(): Project {
        return this.data.project;
    }

    setProject(data: Project) {
        this.isProjectFormValid = true;

        this.data.project = data;

        this.workflowService.validateStep(STEPS.project);
    }

    getInput(): Input {
        return this.data.input;
    }

    setInput(input: Input) {

        this.isInputFormValid = true;
        this.data.input = input;

        this.workflowService.validateStep(STEPS.input);
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
            = this.isInputFormValid
            = this.isPlatformFormValid
            = this.isModelFormValid
            = this.isAlgorithmFormValid
            = false;

        return this.data;
    }

    isFormValid() {
        return this.isProjectFormValid &&
                this.isInputFormValid &&
                this.isPlatformFormValid &&
                this.isModelFormValid &&
                this.isAlgorithmFormValid;
    }
}
