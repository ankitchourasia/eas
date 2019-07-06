import { NgModule } from '@angular/core';
import { UppercaseDirective } from './uppercase.directive';
import { MinValidatorDirective } from './min-validator.directive';
import { MaxValidatorDirective } from './max-validator.directive';
import { ScrollIntoViewDirective } from './scroll-into-view.directive';

@NgModule({
  declarations: [
    UppercaseDirective,
    MinValidatorDirective,
    MaxValidatorDirective,
    ScrollIntoViewDirective
  ],
  exports:[
    UppercaseDirective,
    MinValidatorDirective,
    MaxValidatorDirective,
    ScrollIntoViewDirective
  ],
})
export class DirectiveModule { }
