import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[pattern][formControlName],[pattern][formControl],[pattern][ngModel]',
})
export class PatternDirective {

  // controlOldValue: any;
  // controlNewValue: any;
  // @Input() pattern: string | RegExp;
  // @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

  // constructor() {}

  // @HostListener('keydown', ['$event'])onKeyDown(event) {
  //   this.controlOldValue = event.target.value;
  // }
  // @HostListener('input', ['$event'])onInputChange(event) {
  //   this.controlNewValue = event.target.value;
    
  //   let regex: RegExp;
  //   let regexStr: string;

  //   if(typeof this.pattern === 'string'){
  //     regexStr = `^${this.pattern}$`;
  //     regex = new RegExp(regexStr);
  //   }else{
  //     regexStr = this.pattern.toString();
  //     regex = this.pattern;
  //   }
  //   console.log("oldValue "+ this.controlOldValue, "newValue "+this.controlNewValue);
  //   // if(!regex.test(this.controlNewValue)){
  //   //   this.ngModelChange.emit(this.controlOldValue);
  //   // }
  // }
}






// import { Directive, ElementRef, HostListener, Input } from '@angular/core';
// import { Validators } from '@angular/forms';

// @Directive({
//   selector: '[pattern][formControlName],[pattern][formControl],[pattern][ngModel]',
// })
// export class PatternDirective {

//   @Input() pattern: string | RegExp;

//   private specialKeys: Array<string> = ['Enter', 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete',  '-' ];

//   constructor(private el: ElementRef) {
//   }
//   // @HostListener('keydown', [ '$event' ])onKeyDown(event: KeyboardEvent) {
    
//   //   if (!this.pattern) return Validators.nullValidator;
//   //   let regex: RegExp;
//   //   let regexStr: string;

//   //   if(typeof this.pattern === 'string'){
//   //     regexStr = `^${this.pattern}$`;
//   //     regex = new RegExp(regexStr);
//   //   }else{
//   //     regexStr = this.pattern.toString();
//   //     regex = this.pattern;
//   //   }
//   //   console.log(regexStr, regex);
//   //   // Allow Backspace, tab, end, and home keys
//   //   if (this.specialKeys.indexOf(event.key) !== -1) {
//   //     return;
//   //   }

//   //   let current: string = this.el.nativeElement.value;
//   //   let next: string = current.concat(event.key);
//   //   console.log(current, next);
//   //   if(next && !String(next).match(regex)){
//   //     event.preventDefault();
//   //   }
//   // }

// }

