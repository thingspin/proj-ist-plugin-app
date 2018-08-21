import { Injectable } from '@angular/core';
import { HashLocationStrategy } from '@angular/common';

// Ref : https://stackoverflow.com/questions/40397273/angular2-app-base-href-with-hashlocationstrategy
@Injectable()
export class CustomLocationStrategy extends HashLocationStrategy {
    prepareExternalUrl(internal: string): string {
        return `${this.getBaseHref()}#${internal}`;
    }
}

export const MONITORING_BASE_HREF = `/plugins/proj-edge-ai-app/page/monitoring`;

export function getStyleUrls(lists: string[]): string[] {
    const baseUrl = 'public/plugins/proj-edge-ai-app';
    const theme = (<any>window).thingspinBootData.user.lightTheme ? 'light' : 'dark' ;
    return lists.concat([
        `${baseUrl}/css/monitoring/${theme}.css`,
        `${baseUrl}/css/monitoring.${theme}.css`,
    ],);
}
