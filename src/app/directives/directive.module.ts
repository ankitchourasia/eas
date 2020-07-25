import { NgModule } from '@angular/core';
import { LowercaseDirective } from './lowercase.directive';
import { UppercaseDirective } from './uppercase.directive';
import { MinValidatorDirective } from './min-validator.directive';
import { MaxValidatorDirective } from './max-validator.directive';
import { ScrollIntoViewDirective } from './scroll-into-view.directive';
import { RemoveCharacterDirective } from './remove-character.directive';
import { CompareValidatorDirective } from './compare-validator.directive';
import { EqualValidatorDirective } from './equal-validator.directive';
import { NumberDirective } from './number.directive';
import { PatternDirective } from './pattern.directive';
import { FocusSelfDirective } from './focus-self.directive';
import { FocusNextDirective } from './focus-next.directive';
import { DisableDirective } from './disable.directive';

@NgModule({
  declarations: [
    FocusSelfDirective,
    FocusNextDirective,
    LowercaseDirective,
    UppercaseDirective,
    MinValidatorDirective,
    MaxValidatorDirective,
    ScrollIntoViewDirective,
    RemoveCharacterDirective,
    CompareValidatorDirective,
    EqualValidatorDirective,
    NumberDirective,
    PatternDirective,
    DisableDirective,
  ],
  exports:[
    FocusSelfDirective,
    FocusNextDirective,
    LowercaseDirective,
    UppercaseDirective,
    MinValidatorDirective,
    MaxValidatorDirective,
    ScrollIntoViewDirective,
    RemoveCharacterDirective,
    CompareValidatorDirective,
    EqualValidatorDirective,
    NumberDirective,
    PatternDirective,
    DisableDirective,
  ],
})
export class DirectiveModule { }
