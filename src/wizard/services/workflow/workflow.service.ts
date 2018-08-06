import { Injectable }         from '@angular/core';
import { STEPS }              from './workflow.model';

@Injectable()
export class WorkflowService {
    private workflow = [
        { step: STEPS.project,  valid: false },
        { step: STEPS.platform, valid: false },
        { step: STEPS.model,    valid: false },
        { step: STEPS.algorithm,valid: false },
        { step: STEPS.result,   valid: false }
    ];

    validateStep(step: string) {
        for (let i = 0; i < this.workflow.length; i++) {
            if (this.workflow[i].step === step) {
                this.workflow[i].valid = true;
                break;
            }
        }
    }

    resetSteps() {
        this.workflow.forEach(element => {
            element.valid = false;
        });
    }

    getFirstInvalidStep(step: string): string {
        let valid = true;
        let redirectToStep = '';

        for (let i = 0; i < this.workflow.length && valid; i++) {
            let item = this.workflow[i];
            if (item.step === step) {
                redirectToStep = '';
                break;
            } else {
                valid = item.valid;
                redirectToStep = item.step;
            }
        }
        return redirectToStep;
    }
}
