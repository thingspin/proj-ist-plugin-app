import { UIRouter }  from "@uirouter/angular";

import { ProjectComponent }  from './project/component';
import { InputComponent }  from './input/component';
import { PlatformComponent }      from './platform/component';
import { ModelComponent }      from './model/component';
import { AlgorithmComponent }   from './algorithm/component';
import { ResultComponent }    from './result/component';

import { WorkflowService } from './workflow/workflow.service';

export const appRouters = [
    { name: 'project',      url: `project`,    component: ProjectComponent },
    { name: 'input',        url: `input`,      component: InputComponent },
    { name: 'platform',     url: `platform`,   component: PlatformComponent,   onEnter: verifyWorkFlow },
    { name: 'model',        url: `model`,      component: ModelComponent,      onEnter: verifyWorkFlow },
    { name: 'algorithm',    url: `algorithm`,  component: AlgorithmComponent,  onEnter: verifyWorkFlow },
    { name: 'result',       url: `result`,     component: ResultComponent,     onEnter: verifyWorkFlow }
];

/** UIRouter Config  */
export function UIRouterConfigFn(router: UIRouter) {
    router.urlService.rules.otherwise({
        state: 'project'
    });
}

function verifyWorkFlow(transition, state) {
    // console.debug("Entered '" + state.name + "' state.");

    var $stateService = transition.router.stateService;
    var workflowService = transition.injector().get(WorkflowService);

    let firstState = workflowService.getFirstInvalidStep(state.name);
    if (firstState.length > 0) {
        // console.debug("Redirected to '" + firstState + "' state which it is the first invalid step.");
        return $stateService.target(firstState);
    }
}
