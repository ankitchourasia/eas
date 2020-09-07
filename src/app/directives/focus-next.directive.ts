import { Directive, Input, Renderer2, HostListener } from "@angular/core";

@Directive({ selector: '[focus-next]' })
export class FocusNextDirective{

    private _elementId : string;
    constructor(private renderer2: Renderer2) { }
    
    @Input("focus-next")
    set focusNext(focusNextElementId : string){
        this._elementId = focusNextElementId;
    }

    @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
        const element = document.getElementById(this._elementId) as HTMLElement;
        if(event.keyCode === 13 && element){
            element.focus();
            // this.renderer2.selectRootElement(`#${_elementId}`, true).focus();
            // this.renderer2.selectRootElement(element[“nativeElement”], true).focus();
            event.preventDefault();
        }
    }
}