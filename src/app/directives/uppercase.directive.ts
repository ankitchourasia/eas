import { Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '.uppercase'
})
export class UppercaseDirective {
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

  constructor() {}
    
  @HostListener('input', ['$event']) onInputChange($event) {
    this.ngModelChange.emit($event.target.value.toUpperCase());
  }
// https://stackoverflow.com/questions/35826325/
// https://stackoverflow.com/questions/40682717/

}