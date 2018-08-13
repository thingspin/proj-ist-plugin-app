import {APP_BASE_HREF, LocationStrategy} from '@angular/common';

/* App Root */
import { AppComponent } from '../components/app.component';
import { ScriptRowComponent } from  '../components/script/component';
import { ScriptListComponent } from  '../components/sctriptList/component';

/* Shared Service */

import { CustomLocationStrategy } from "./common";

// const verifyWorkFlow = (transition, state) => {
    // console.debug("Entered '" + state.name + "' state.");

    // var $stateService = transition.router.stateService;
    // var stepService = transition.injector().get(StepService);

    // let firstState = stepService.getFirstInvalidStep(state.name);
    // if (firstState.length > 0) {
    //     // console.debug("Redirected to '" + firstState + "' state which it is the first invalid step.");
    //     return $stateService.target(firstState);
    // }
// };

export const appProviders = [
    // { provide: FormDataService, useClass: FormDataService },
    // { provide: StepService, useClass: StepService },
    { provide: APP_BASE_HREF,   useValue: window.location.pathname},
    { provide: LocationStrategy, useClass: CustomLocationStrategy},
];

export const appRouters = [
    // { name: 'project',      url: `project`,    component: ProjectComponent },
    // { name: 'platform',     url: `platform`,   component: PlatformComponent,   onEnter: verifyWorkFlow },
    // { name: 'model',        url: `model`,      component: ModelComponent,      onEnter: verifyWorkFlow },
    // { name: 'algorithm',    url: `algorithm`,  component: AlgorithmComponent,  onEnter: verifyWorkFlow },
    // { name: 'result',       url: `result`,     component: ResultComponent,     onEnter: verifyWorkFlow }
];


export const appDeclarations = [
    AppComponent,
    ScriptRowComponent,
    ScriptListComponent
    // WorkflowComponent,
    // ProjectComponent,
    // PlatformComponent,
    // ModelComponent,
    // AlgorithmComponent,
    // ResultComponent,
];
