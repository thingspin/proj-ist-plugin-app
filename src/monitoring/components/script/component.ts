import {
  Component,
  Input,
  HostBinding
} from '@angular/core';
import { ScriptInfo } from '../../models/default.model';

/**
 * @ProductRow: A component for the view of single Product
 */
@Component({
  selector: 'script-row',
  template:  require(`./component.html`),
})
export class ScriptRowComponent {
  @Input() script: ScriptInfo;
  @HostBinding('attr.class') cssClass = 'item';
}
