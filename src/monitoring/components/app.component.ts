import { Component, OnInit, Inject } from '@angular/core';
import { StateService, UIRouter } from '@uirouter/core';

function getStyleUrls(): string [] {
    let theme: string = ((<any>window).thingspinBootData.user.lightTheme) ? 'light' : 'dark';
    let csss: string[] = [];

    let prefix = 'public/plugins/proj-edge-ai-app/css/monitoring/';

    csss.push(prefix + theme + '.css');

    return csss;
}

@Component ({
    selector: 'edge-ai-inference-monitoring',
    template: require(`./app.component.html`),
    styleUrls: getStyleUrls(),
})
export class AppComponent implements OnInit {
    title: String = 'Script Monitoring';
    $stateService: StateService;

    constructor( @Inject(UIRouter) private router: UIRouter,
        // @Inject("appModel") private appModel, 
    ) {
        console.log(this.title + ' constructor!');
    }

    ngOnInit() {
        console.log(this.title + ' loaded!');
        this.$stateService = this.router.stateService;
        this.$stateService.go("list");
    }
}
