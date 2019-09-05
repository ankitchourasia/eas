import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '.lowercase'
})
export class LowercaseDirective {
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  
  @HostListener('input', ['$event']) onInputChange($event) {
    this.ngModelChange.emit($event.target.value.toLowerCase());
  }
// https://stackoverflow.com/questions/35826325/
// https://stackoverflow.com/questions/40682717/

}