import { Directive, Input, Renderer, Renderer2 } from "@angular/core";

@Directive({ selector: '[focus-self]' })
export class FocusSelfDirective{

    constructor(private renderer: Renderer, private renderer2: Renderer2) { }

    @Input("id")
    set setElementId(elementId : string){
        const element = document.getElementById(elementId) as HTMLElement;
        if (element) {
            this.renderer.invokeElementMethod(element, 'focus');
            // element.focus()
            // this.renderer2.selectRootElement(`#${elementId}`, true).focus();
        }
    }
}