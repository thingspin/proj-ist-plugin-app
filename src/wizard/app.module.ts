
import './polyfills';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UIRouterModule } from "@uirouter/angular";
import { FormsModule } from '@angular/forms';

/* App Root */
import { AppComponent } from './app.component';

/* App Router */
import { appRouters, UIRouterConfigFn } from "./app.router";
import { appProviders, appDeclarations} from "./app.states";


@NgModule({
    imports: [BrowserModule,
        FormsModule,
        UIRouterModule.forRoot({
            states: appRouters,
            useHash: true,
            config: UIRouterConfigFn
        })
    ],
    providers: appProviders,
    declarations: appDeclarations,
    bootstrap: [AppComponent]
})
export class WizardModule { }
