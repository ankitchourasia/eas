import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
  // CSS selector for attributes
  selector: '[min][formControlName],[min][formControl],[min][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinValidatorDirective, multi: true}]
})
export class MinValidatorDirective implements Validator {
  // @Input() min: number;
  min: number;

  @Input('min')
  setMax(min: number){
    this.min = min;
  }

  constructor() { }

  validate(control: AbstractControl): ValidationErrors {
    const currentValue = control.value;
    const isValid = currentValue >= this.min;
    return isValid ? null : {
      min: {
        valid: false,
        min: this.min,
        actual: currentValue
      }
    };
  }
}