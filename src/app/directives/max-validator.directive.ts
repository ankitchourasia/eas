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
    // throw new Error("Method not implemented.");
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
        requiredMax: this.max,
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
          requiredMax: max,
          actualValue: control.value
        }
      }
    }
  }
}


// export class MaxValidatorDirectives implements Validator {
//   @Input() max: number;
//   @Input() type: any;
  
//   // @Input() a:number; // Make this a required attribute. Throw an exception if it doesnt exist
//   // ngOnInit() {
//   //   if(a === null) throw new Error("Attribute 'a' is required");
//   // }

//   constructor(private datePipe: DatePipe) { }

//   validate(control: AbstractControl): ValidationErrors {
//     if(!control.value || control.value.length === 0){
//       return null;
//     }
//     if(this.type === 'text' || this.type === 'number'){
//       const currentValue = Number(control.value);
//       const max = Number(this.max);
//       const isValid = !isNaN(currentValue) && !isNaN(max) && currentValue <= max;
//       // return errors as an object
//       return isValid ? null : {
//         max: {
//           valid: false,
//           requiredMax: max,
//           actualMax: currentValue
//         }
//       };
//     }else if(this.type === 'date'){
//       // const currentValue = new Date(control.value).toISOString().slice(0,10);
//       // const max = new Date(this.max).toISOString().slice(0,10);
//       const currentValue = (control.value);
//       const max = (this.max);
//       const isValid = currentValue <= max;
//       // return errors as an object
//       return isValid ? null : {
//         max: {
//           valid: false,
//           requiredMax: this.datePipe.transform(max, 'dd-MMM-yyyy'),
//           actualMax: this.datePipe.transform(currentValue, 'dd-MMM-yyyy')
//         }
//       };
//     }
//   }
// }