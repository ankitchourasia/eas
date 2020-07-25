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
    <fieldset [disabled]="disableElement">
      <ng-content></ng-content>
    </fieldset>
  `
})
export class DisableDirective {
  
  @Input('disableElement') disableElement: boolean;

  constructor() { }

}
