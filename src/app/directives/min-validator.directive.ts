import { Directive, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS, Validators, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[min]',
  // selector: '[min][formControlName],[min][formControl],[min][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinValidatorDirective, multi: true}]
})
export class MinValidatorDirective implements Validator, OnChanges {
  @Input() min: number;
  private validationFunction = Validators.nullValidator;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error("Method not implemented.");
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if(changes.min) {
  //     const min = changes.min.currentValue;
  //     this.validationFunction = this.minValidator(min);
  //   } else {
  //     this.validationFunction = Validators.nullValidator;
  //   }
  // }
  
  // validate(control: AbstractControl): ValidationErrors | null {
  //   return this.validationFunction(control);
  // }

  validate(control: AbstractControl): ValidationErrors {
    console.log("current value: ", control.value, "min value: ", this.min);
    if(this.min === null || this.min === undefined){
      return null;
    }
    const currentValue = control.value;
    const isValid = currentValue >= this.min;
    return isValid ? null : {
      min: {
        valid: false,
        min: this.min,
        actualValue: currentValue
      }
    };
  }

  minValidator(min : number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      console.log("current value: ", control.value, "min value: ", min);
      return control.value >= min ? null : {
        min: {
          valid: false,
          min: min,
          actualValue: control.value
        }
      }
    }
  }
}