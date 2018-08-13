import {
    Component,
    Input,
    HostBinding
  } from '@angular/core';
  import { ScriptInfo } from '../formData/formData.script';
  
  /**
   * @ProductRow: A component for the view of single Product
   */
  @Component({
    selector: 'script-row',
    templateUrl: './component.html',
  })
  export class ScriptRowComponent {
    @Input() script: ScriptInfo;
    @HostBinding('attr.class') cssClass = 'item';
  }