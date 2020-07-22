import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'input[type=number]'
})
export class NumberDirective {
  constructor() {}

  @HostListener('keydown', ['$event'])onKeyDown(event: KeyboardEvent) {
    if(event.key === "e" || event.key === "E"){
      event.preventDefault();
      return;
    }
 }
}
