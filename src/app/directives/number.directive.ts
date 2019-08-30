import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: 'input[type=number]'
})
export class NumberDirective {

  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

  constructor() {}

  @HostListener('keydown', ['$event'])onKeyDown(event: KeyboardEvent) {
    console.log(event);
    if((event.key === "e" || event.key === "E")){
      event.preventDefault();
    }
 }

}
