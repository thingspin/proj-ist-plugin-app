import {APP_BASE_HREF, LocationStrategy} from '@angular/common';

/* App Root */
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/component';

import { ProjectComponent }  from './project/component';
import { InputComponent }  from './input/component';
import { PlatformComponent }      from './platform/component';
import { ModelComponent }      from './model/component';
import { AlgorithmComponent }   from './algorithm/component';
import { ResultComponent }    from './result/component';

/* Shared Service */
import { FormDataService } from './data/formData.service';
import { WorkflowService } from './workflow/workflow.service';

import { CustomLocationStrategy} from "./custom/common";

export const appProviders = [
    { provide: FormDataService, useClass: FormDataService },
    { provide: WorkflowService, useClass: WorkflowService },
    { provide: APP_BASE_HREF,   useValue: window.location.pathname},
    { provide: LocationStrategy, useClass: CustomLocationStrategy},
];

export const appDeclarations = [
    AppComponent,
    NavbarComponent,
    ProjectComponent,
    InputComponent,
    PlatformComponent,
    ModelComponent,
    AlgorithmComponent,
    ResultComponent
];
