import { Directive, Input, Renderer2, ElementRef, OnInit } from "@angular/core";

@Directive({ selector: '[focus-self]' })
export class FocusSelfDirective implements OnInit{
// export class FocusSelfDirective  implements OnInit{

    _elementId: string;
    constructor(private elementRef: ElementRef, private renderer2: Renderer2) { }

    @Input("id")
    set elementId(elementId : string){
        this._elementId = elementId
    }

    ngOnInit(){
        this.renderer2.selectRootElement(this.elementRef["nativeElement"], true).focus();
        // const element = document.getElementById(this._elementId) as HTMLElement;
        // if (element) {
        //     element.focus();
        //     // this.renderer2.selectRootElement(`#${this._elementId}`, true).focus();
        // }
    }
}