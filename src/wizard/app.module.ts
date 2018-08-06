
import './polyfills';

import { NgModule }           from '@angular/core';
import { BrowserModule }      from '@angular/platform-browser';
import { UIRouterModule }     from "@uirouter/angular";
import { FormsModule }        from '@angular/forms';

/* App Root */
import { AppComponent }       from './app.component';
import { NavbarComponent }    from './navbar/component';

/* Feature Components */
import { ProjectComponent }  from './project/component';
import { InputComponent }  from './input/component';
import { PlatformComponent }      from './platform/component';
import { ModelComponent }      from './model/component';
import { AlgorithmComponent }   from './algorithm/component';
import { ResultComponent }    from './result/component';

/* App Router */
import { UIRouterConfigFn }   from "./app.router";
import { appStates }          from "./app.states";

/* Shared Service */
import { FormDataService }    from './data/formData.service';
import { WorkflowService }    from './workflow/workflow.service';

@NgModule({
    imports:[ BrowserModule, 
              FormsModule,
              UIRouterModule.forRoot({ 
                states: appStates,
                useHash: true,
                config: UIRouterConfigFn
                }) 
    ],
    providers:    [ { provide: FormDataService, useClass: FormDataService },
                    { provide: WorkflowService, useClass: WorkflowService }],
    declarations: [ 
        AppComponent, 
        NavbarComponent,
        ProjectComponent,
        InputComponent,
        PlatformComponent,
        ModelComponent,
        AlgorithmComponent,
        ResultComponent 
    ],
    bootstrap:    [ AppComponent ]
})
export class WizardModule {}