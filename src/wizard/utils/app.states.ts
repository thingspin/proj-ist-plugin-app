import {APP_BASE_HREF, LocationStrategy} from '@angular/common';

/* App Root */
import { AppComponent } from '../components/app.component';
import { WorkflowComponent } from '../components/workflow/component';

/* Angular2 Components */
import { ProjectComponent }  from '../components/project/component';
import { PlatformComponent }      from '../components/platform/component';
import { ModelComponent }      from '../components/model/component';
import { AlgorithmComponent }   from '../components/algorithm/component';
import { ResultComponent }    from '../components/result/component';

/* Shared Service */
import { FormDataService } from '../services/formData/formData.service';
import { StepService } from '../services/step/step.service';

import { CustomLocationStrategy, WIZARD_BASE_HREF } from "./common";
import { BackendService } from '../services/backendSrv/backendSrv.service';
import { MqttService } from '../services/mqtt/mqttSrv.service';

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

export const appProviders: any[] = [
    { provide: MqttService, useClass: MqttService },
    { provide: BackendService,    useClass: BackendService},
    { provide: FormDataService, useClass: FormDataService },
    { provide: StepService, useClass: StepService },
    // { provide: APP_BASE_HREF,   useValue: window.location.pathname},
    { provide: APP_BASE_HREF,   useValue: WIZARD_BASE_HREF},
    { provide: LocationStrategy, useClass: CustomLocationStrategy},
];

export const appRouters: any[] = [
    { name: 'project',      url: `project`,    component: ProjectComponent },
    { name: 'platform',     url: `platform`,   component: PlatformComponent,   onEnter: verifyWorkFlow },
    { name: 'model',        url: `model`,      component: ModelComponent,      onEnter: verifyWorkFlow },
    { name: 'algorithm',    url: `algorithm`,  component: AlgorithmComponent,  onEnter: verifyWorkFlow },
    { name: 'result',       url: `result`,     component: ResultComponent,     onEnter: verifyWorkFlow }
];

export const appEntryCompoents: any[] = [
];


export const appDeclarations: any[] = [
    AppComponent,
    WorkflowComponent,
    ProjectComponent,
    PlatformComponent,
    ModelComponent,
    AlgorithmComponent,
    ResultComponent,
];
