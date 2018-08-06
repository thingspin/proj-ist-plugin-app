import { Injectable }         from '@angular/core';
import { STEPS }              from './step.model';

@Injectable()
export class StepService {
    private steps = [
        { step: STEPS.project,  valid: false },
        { step: STEPS.platform, valid: false },
        { step: STEPS.model,    valid: false },
        { step: STEPS.algorithm,valid: false },
        { step: STEPS.result,   valid: false }
    ];

    validateStep(step: string) {
        var found = false;
        for (var i = 0; i < this.steps.length && !found; i++) {
            if (this.steps[i].step === step) {
                found = this.steps[i].valid = true;
            }
        }
    }

    resetSteps() {
        this.steps.forEach(element => {
            element.valid = false;
        });
    }

    getFirstInvalidStep(step: string): string {
        var found = false;
        var valid = true;
        var redirectToStep = '';
        for (var i = 0; i < this.steps.length && !found && valid; i++) {
            let item = this.steps[i];
            if (item.step === step) {
                found = true;
                redirectToStep = '';
            } else {
                valid = item.valid;
                redirectToStep = item.step;
            }
        }
        return redirectToStep;
    }
}
