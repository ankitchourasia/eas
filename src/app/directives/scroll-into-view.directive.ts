import { Directive, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[eas-scroll-into-view]'
})
export class ScrollIntoViewDirective {

  constructor(private renderer2 : Renderer2) { }

  @Input("id")
  set setElementId(elementId : string){
      const element = document.getElementById(elementId);
      console.log(element);
      if(element){
        element.scrollIntoView();
        // this.renderer2.selectRootElement(elementId, true).scrollIntoView({ behavior: 'smooth', block: "start" });
        // this.renderer2.selectRootElement(`#${elementId}`, true).scrollIntoView({ behavior: 'smooth', block: "start" });
      }
  }
}