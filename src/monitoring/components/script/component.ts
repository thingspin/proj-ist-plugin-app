import {
  Component,
  HostBinding
} from '@angular/core';

/**
 * @ProductRow: A component for the view of single Product
 */
@Component({
  selector: 'script-row',
  template:  require(`./component.html`),
})
export class ScriptRowComponent {
  @HostBinding('attr.class') cssClass = 'item';
}
