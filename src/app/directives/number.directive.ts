import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: 'input[type=number]'
})
export class NumberDirective {

  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

  constructor() {}
    
  @HostListener('input', ['$event']) onInputChange($event) {
    let number = Number.parseFloat($event.target.value);
    if(!isNaN(number)){
      $event.target.value = number.toPrecision();
      this.ngModelChange.emit(Number($event.target.value));
    }
  }

}
