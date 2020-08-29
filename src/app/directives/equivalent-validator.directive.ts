import { Directive, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Validator, NgModel, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[equivalent]'
})
export class EquivalentValidatorDirective implements Validator, OnChanges {

  @Input() equivalent: NgModel;
  private validationFunction = Validators.nullValidator;

  ngOnChanges(changes: SimpleChanges): void {
    let change = changes['equivalent'];
    if (change) {
      const otherFieldModel = change.currentValue;
      this.validationFunction = fieldMatchesValidator(otherFieldModel);
    } else {
      this.validationFunction = Validators.nullValidator;
    }
  }
  
  validate(control: AbstractControl): ValidationErrors | any {
    return this.validationFunction(control);
  }
}
export function fieldMatchesValidator(otherFieldModel: NgModel): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    return control.value === otherFieldModel.value ? null : {'equivalent': {match: false}};
  };
}