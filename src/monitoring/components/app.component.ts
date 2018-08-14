import { Component, OnInit, Inject } from '@angular/core';
import { StateService, UIRouter } from '@uirouter/core';

@Component ({
    selector: 'edge-ai-inference-monitoring',
    template: require(`./app.component.html`),
    styleUrls: [
        'public/plugins/proj-edge-ai-app/css/monitoring.css',
    ],
})
export class AppComponent implements OnInit {
    title: String = 'Script Monitoring';
    $stateService: StateService;

    constructor( @Inject(UIRouter) private router: UIRouter) {
        console.log(this.title + ' constructor!');
    }

    ngOnInit() {
        console.log(this.title + ' loaded!');
        this.$stateService = this.router.stateService;
        this.$stateService.go("list");
    }
}
