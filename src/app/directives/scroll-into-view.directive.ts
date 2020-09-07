import { Directive, Input, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[eas-scroll-into-view]'
})
export class ScrollIntoViewDirective {

  _elementId: string;
  constructor(private elementRef: ElementRef, private renderer2 : Renderer2) { }

  @Input("id")
  set elementId(elementId : string){
      this._elementId = elementId
  }

  ngOnInit(){
    const element = document.getElementById(this._elementId) as HTMLElement;
    if (element) {
        element.scrollIntoView();
        // this.renderer2.selectRootElement(`#${this._elementId}`, true).scrollIntoView({ behavior: 'smooth', block: "start" });
    }
    // this.renderer2.selectRootElement(this.elementRef["nativeElement"], true).scrollIntoView({ behavior: 'smooth', block: "start" });
  }
}