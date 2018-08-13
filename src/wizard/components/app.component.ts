import { styleUrls } from '../utils/app.style';
import { enableProdMode, Component, Inject, OnInit, Input } from '@angular/core';
import { FormDataService }  from '../services/formData/formData.service';
import { UIRouter, StateService } from '@uirouter/core';

enableProdMode();

@Component ({
    selector: 'edge-ai-inference-wizard',
    template: require(`./app.component.html`),
    styleUrls: styleUrls,
})
export class AppComponent implements OnInit {
    title: String = 'Wizard';
    $stateService: StateService;
    @Input() formData;

    constructor(
        @Inject(FormDataService) private formDataService: FormDataService,
        @Inject(UIRouter) private router: UIRouter
    ) {
        console.log(this.title + ' constructor!');
    }

    ngOnInit() {
        this.formData = this.formDataService.getFormData();
        console.log(this.title + ' loaded!');
        this.$stateService = this.router.stateService;
        this.$stateService.go("project");
    }
}
