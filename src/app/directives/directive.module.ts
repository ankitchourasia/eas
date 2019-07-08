import { NgModule } from '@angular/core';
import { LowercaseDirective } from './lowercase.directive';
import { UppercaseDirective } from './uppercase.directive';
import { MinValidatorDirective } from './min-validator.directive';
import { MaxValidatorDirective } from './max-validator.directive';
import { ScrollIntoViewDirective } from './scroll-into-view.directive';
import { RemoveCharacterDirective } from './remove-character.directive';
import { CompareValidatorDirective } from './compare-validator.directive';
import { EqualValidatorDirective } from './equal-validator.directive';

@NgModule({
  declarations: [
    LowercaseDirective,
    UppercaseDirective,
    MinValidatorDirective,
    MaxValidatorDirective,
    ScrollIntoViewDirective,
    RemoveCharacterDirective,
    CompareValidatorDirective,
    EqualValidatorDirective,
  ],
  exports:[
    LowercaseDirective,
    UppercaseDirective,
    MinValidatorDirective,
    MaxValidatorDirective,
    ScrollIntoViewDirective,
    RemoveCharacterDirective,
    CompareValidatorDirective,
    EqualValidatorDirective
  ],
})
export class DirectiveModule { }
