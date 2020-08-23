import { Component, Input } from '@angular/core';

@Component({
  selector: '[disableFieldset]',
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

  @Input("disableFieldset")
  set setDisableFieldset(disabled : boolean){
    this.disabled = disabled;
  }

  constructor() { }

}
// host: {
//   "[style.background]":"'transparent'",
// },