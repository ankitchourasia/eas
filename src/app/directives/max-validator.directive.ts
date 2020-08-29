import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS, Validators, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[max]',
  // selector: '[max][formControlName],[max][formControl],[max][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: MaxValidatorDirective, multi: true}]
})
export class MaxValidatorDirective implements Validator, OnChanges  {
  @Input() max: number;
  private validationFunction = Validators.nullValidator;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error("Method not implemented.");
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if(changes.max){
  //     const max = changes.max.currentValue;
  //     this.validationFunction = this.maxValidator(max);
  //   } else {
  //     this.validationFunction = Validators.nullValidator;
  //   }
  // }
  
  // validate(control: AbstractControl): ValidationErrors | null {
  //   return this.validationFunction(control);
  // }
  
  validate(control: AbstractControl): ValidationErrors {
    console.log("current value: ", control.value, "max value: ", this.max);
    if(this.max === null || this.max === undefined){
      return null;
    }
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

  maxValidator(max : number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      console.log("current value: ", control.value, "max value: ", max);
      return control.value <= max ? null : {
        max: {
          valid: false,
          max: max,
          actualValue: control.value
        }
      }
    }
  }
}