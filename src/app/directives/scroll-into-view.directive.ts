import { Directive, Renderer, Input } from '@angular/core';

@Directive({
  selector: '[eas-scroll-into-view]'
})
export class ScrollIntoViewDirective {

  constructor(private renderer: Renderer) { }

    @Input("id")
    set setElementId(elementId : string){
        const element = document.getElementById(elementId);
        if(element){
          this.renderer.invokeElementMethod(element, "scrollIntoView");
        }
    }
}