import {
  Component,
  // EventEmitter,
  // Input,
  // Output
} from '@angular/core';
import { ScriptInfo } from '../formData/formData.script';

/**
 * @ProductsList: A component for rendering all ProductRows and
 * storing the currently selected Product
 */
@Component({
  selector: 'scripts-list',
  templateUrl: './component.html'
})
export class ScriptListComponent {
  /**
   * @input productList - the Product[] passed to us
   */
  // @Input() scriptsList: ScriptInfo[];

  /**
   * @output onProductSelected - outputs the current
   *          Product whenever a new Product is selected
   */
  // @Output() onScriptSelected: EventEmitter<ScriptInfo>;

  /**
   * @property currentProduct - local state containing
   *             the currently selected `Product`
   */
  // private currentScript: ScriptInfo;
  scriptsList: ScriptInfo[];

  constructor() {
    // this.onScriptSelected = new EventEmitter();
    this.scriptsList = [
      new ScriptInfo(
          'test1',
          'test1',
          'test1',
          'test1',
          'test1',
          'test1',
          'test1',
          'test1'
      ),
      new ScriptInfo(
          'test2',
          'test2',
          'test2',
          'test2',
          'test2',
          'test2',
          'test2',
          'test2'
      ),
      new ScriptInfo(
          'test3',
          'test3',
          'test3',
          'test3',
          'test3',
          'test3',
          'test3',
          'test3'
      )
  ];

  }

  // clicked(script: ScriptInfo): void {
    // this.currentScript = script;
    // this.onScriptSelected.emit(script);
  // }

  // isSelected(script: ScriptInfo): boolean {
    // if (!script || !this.currentScript) {
      // return false;
    // }
    // return script.cid === this.currentScript.cid;
  // }

}