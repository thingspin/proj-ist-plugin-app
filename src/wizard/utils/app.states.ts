import {APP_BASE_HREF, LocationStrategy} from '@angular/common';

/* App Root */
import { AppComponent } from '../components/app.component';
import { WorkflowComponent } from '../components/workflow/component';

import { ProjectComponent }  from '../components/project/component';
import { PlatformComponent }      from '../components/platform/component';
import { ModelComponent }      from '../components/model/component';
import { AlgorithmComponent }   from '../components/algorithm/component';
import { ResultComponent }    from '../components/result/component';

/* Shared Service */
import { FormDataService } from '../services/formData/formData.service';
import { StepService } from '../services/step/step.service';

/* Directives */
import { FileValidator } from '../directives/file-input.validator';

import { CustomLocationStrategy} from "./common";

const verifyWorkFlow = (transition, state) => {
    // console.debug("Entered '" + state.name + "' state.");

    var $stateService = transition.router.stateService;
    var stepService = transition.injector().get(StepService);

    let firstState = stepService.getFirstInvalidStep(state.name);
    if (firstState.length > 0) {
        // console.debug("Redirected to '" + firstState + "' state which it is the first invalid step.");
        return $stateService.target(firstState);
    }
};

export const appProviders = [
    { provide: FormDataService, useClass: FormDataService },
    { provide: StepService, useClass: StepService },
    { provide: APP_BASE_HREF,   useValue: window.location.pathname},
    { provide: LocationStrategy, useClass: CustomLocationStrategy},
];

export const appRouters = [
    { name: 'project',      url: `project`,    component: ProjectComponent },
    { name: 'platform',     url: `platform`,   component: PlatformComponent,   onEnter: verifyWorkFlow },
    { name: 'model',        url: `model`,      component: ModelComponent,      onEnter: verifyWorkFlow },
    { name: 'algorithm',    url: `algorithm`,  component: AlgorithmComponent,  onEnter: verifyWorkFlow },
    { name: 'result',       url: `result`,     component: ResultComponent,     onEnter: verifyWorkFlow }
];


export const appDeclarations = [
    AppComponent,
    WorkflowComponent,
    ProjectComponent,
    PlatformComponent,
    ModelComponent,
    AlgorithmComponent,
    ResultComponent,
    FileValidator
];
