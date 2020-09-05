import { Directive, Input, Renderer2, ElementRef } from "@angular/core";

@Directive({ selector: '[focus-self]' })
export class FocusSelfDirective{
// export class FocusSelfDirective  implements OnInit{

    constructor(private elementRef: ElementRef, private renderer2: Renderer2) { }

    @Input("id")
    set setElementId(elementId : string){
        const element = document.getElementById(elementId) as HTMLElement;
        if (element) {
            element.focus();
            // this.renderer2.selectRootElement(`#${elementId}`, true).focus();
        }
    }

    ngOnInit(){
        this.renderer2.selectRootElement(this.elementRef["nativeElement"], true).focus();
    }
}