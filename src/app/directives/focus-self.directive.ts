import { Directive, Input, Renderer, Renderer2, ElementRef } from "@angular/core";

@Directive({ selector: '[focus-self]' })
export class FocusSelfDirective{
// export class FocusSelfDirective  implements OnInit{

    constructor(private renderer: Renderer, private hostElement: ElementRef, private renderer2: Renderer2) { }

    @Input('focus-self') focus: boolean = true;

    @Input("id")
    set setElementId(elementId : string){
        const element = document.getElementById(elementId) as HTMLElement;
        if (element) {
            this.renderer.invokeElementMethod(element, 'focus');
            // element.focus()
            // element['focus'].apply(element);
            // this.renderer2.selectRootElement(`#${elementId}`, true).focus();
        }
    }

    // ngOnInit(){
    //     this.renderer2.selectRootElement(this.hostElement["nativeElement"], true).focus();
    //     if (this.focus) {
    //         this.el.nativeElement.focus();
    //     }
    // }
}