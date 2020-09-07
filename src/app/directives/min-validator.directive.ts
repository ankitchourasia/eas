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
        requiredMin: this.min,
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
          requiredMin: min,
          actualValue: control.value
        }
      }
    }
  }
}


// export class MinValidatorDirective implements Validator {
//   // new @Input here
//   // it will get the min number from the attribute
//   // For example 5 for <input min=5 ...
//   @Input() min: number;
//   @Input() type: any;

//   constructor(private datePipe: DatePipe) { }

//   // Define validation logic
//   validate(control: AbstractControl): ValidationErrors {
//     console.log(this.type);
//     if(!control.value || control.value.length === 0){
//       return null;
//     }
//     if(this.type ==='text' || this.type === 'number'){
//       const currentValue = Number(control.value);
//       const min = Number(this.min);
//       const isValid = !isNaN(currentValue) && !isNaN(min) && currentValue >= min;
//       // return errors as an object
//       return isValid ? null : {
//         min: {
//           valid: false,
//           requiredMin: min,
//           actualMin: currentValue
//         }
//       };
//     }else if(this.type === 'date'){
//       // const currentValue = new Date(control.value).toISOString().slice(0,10);
//       // const min = new Date(this.min).toISOString().slice(0,10);
//       const currentValue = (control.value);
//       const min = (this.min);
//       const isValid = currentValue >= min;
//       // return errors as an object
//       return isValid ? null : {
//         min: {
//           valid: false,
//           requiredMin: this.datePipe.transform(min,'dd-MMM-yyyy'),
//           actualMin:  this.datePipe.transform(currentValue,'dd-MMM-yyyy')
//         }
//       };
//     }  
//   }
// }