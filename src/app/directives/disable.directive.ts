import { Component, Input } from '@angular/core';

@Component({
  selector: '[disableElement]',
  styles: [`
    fieldset {
      display: block;
      margin: unset;
      padding: unset;
      border: unset;
    }
  `],
  template: `
    <fieldset [disabled]="disabled">
      <ng-content></ng-content>
    </fieldset>
  `
})
export class DisableDirective {
  disabled : boolean;

  @Input("disableElement")
  set setDisableElement(disabled : boolean){
    this.disabled = disabled;
  }

  constructor() { }

}