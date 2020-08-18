import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[max][formControlName],[max][formControl],[max][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: MaxValidatorDirective, multi: true}]
})
export class MaxValidatorDirective implements Validator {
  // @Input() max: number;
  max: number;

  @Input('max')
  setMax(max: number){
    this.max = max;
  }

  constructor() { }

  validate(control: AbstractControl): ValidationErrors {
    const currentValue = control.value;
    const isValid = currentValue <= this.max;
    return isValid ? null : {
      max: {
        valid: false,
        max: this.max,
        actualValue: currentValue
      }
    };
  }
}