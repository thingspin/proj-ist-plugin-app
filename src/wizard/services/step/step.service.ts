import { Injectable }         from '@angular/core';
import { STEPS, Step }              from './step.model';

@Injectable()
export class StepService {
    private steps: Step[] = [
        { step: STEPS.project,  valid: false },
        { step: STEPS.platform, valid: false },
        { step: STEPS.model,    valid: false },
        { step: STEPS.algorithm,valid: false },
        { step: STEPS.result,   valid: false }
    ];

    validateStep(step: String) {
        var found: Boolean = false;
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

    getFirstInvalidStep(step: String): String {
        var found: Boolean = false;
        var valid: Boolean = true;
        var redirectToStep: String = '';
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
