import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Validators } from '@angular/forms';

@Directive({
  selector: '[pattern][formControlName],[pattern][formControl],[pattern][ngModel]',
})
export class PatternDirective {

  @Input() pattern: string | RegExp;

  private specialKeys: Array<string> = ['Enter', 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete',  '-' ];

  constructor(private el: ElementRef) {
  }
  // @HostListener('keydown', [ '$event' ])onKeyDown(event: KeyboardEvent) {
    
  //   if (!this.pattern) return Validators.nullValidator;
  //   let regex: RegExp;
  //   let regexStr: string;

  //   if(typeof this.pattern === 'string'){
  //     regexStr = `^${this.pattern}$`;
  //     regex = new RegExp(regexStr);
  //   }else{
  //     regexStr = this.pattern.toString();
  //     regex = this.pattern;
  //   }
  //   console.log(regexStr, regex);
  //   // Allow Backspace, tab, end, and home keys
  //   if (this.specialKeys.indexOf(event.key) !== -1) {
  //     return;
  //   }

  //   let current: string = this.el.nativeElement.value;
  //   let next: string = current.concat(event.key);
  //   console.log(current, next);
  //   if(next && !String(next).match(regex)){
  //     event.preventDefault();
  //   }
  // }

}
