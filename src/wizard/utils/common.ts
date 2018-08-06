import { Injectable } from '@angular/core';
import { HashLocationStrategy } from '@angular/common';

// Ref : https://stackoverflow.com/questions/40397273/angular2-app-base-href-with-hashlocationstrategy
@Injectable()
export class CustomLocationStrategy extends HashLocationStrategy {
    prepareExternalUrl(internal: string): string {
        return `${this.getBaseHref()}/#${internal}`;
    }
}
