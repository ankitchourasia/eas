import { Directive, Input, Renderer2, HostListener } from "@angular/core";

@Directive({ selector: '[focus-next]' })
export class FocusNextDirective{

    private elementId : string;
    constructor(private renderer2: Renderer2) { }
    
    @Input("focus-next")
    set setFocusNext(focusNextElementId : string){
        this.elementId = focusNextElementId;
    }

    @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
        const element = document.getElementById(this.elementId) as HTMLElement;
        if(event.keyCode === 13 && element){
            element.focus();
            // this.renderer2.selectRootElement(`#${elementId}`, true).focus();
            // this.renderer2.selectRootElement(element[“nativeElement”], true).focus();
            event.preventDefault();
        }
    }
}