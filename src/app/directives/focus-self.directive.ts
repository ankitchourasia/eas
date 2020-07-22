import { Directive, Input, Renderer2 } from "@angular/core";

@Directive({ selector: '[focus-self]' })
export class FocusSelfDirective{

    constructor(private renderer2: Renderer2) { }

    @Input("id")
    set setElementId(elementId : string){
        const element = document.getElementById(elementId) as HTMLElement;
        if (element) {
            element.focus();
            // this.renderer2.selectRootElement(`#${elementId}`, true).focus();
        }
    }
}