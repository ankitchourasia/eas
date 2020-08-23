import { Directive, Input, OnChanges, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

const TAG_ANCHOR = 'a';
const DISABLED = 'disabled';
const TAB_INDEX = 'tabindex';

@Directive({
  selector: '[disableElement]'
})
export class DisableDirective2 implements OnChanges, AfterViewInit {

  @Input() disableElement = true;

  constructor(private elementRef: ElementRef, private renderer: Renderer2){ }

  ngOnChanges(){
    this.disableElementTag(this.elementRef.nativeElement);
  }

  ngAfterViewInit(){
    this.disableElementTag(this.elementRef.nativeElement);
  }

  private disableElementTag(element: any){
    const TAG_NAME: string = element.tagName.toLowerCase();
    if(this.disableElement){
      if(!element.hasAttribute(DISABLED)){
        this.renderer.addClass(element, DISABLED);
        this.renderer.setAttribute(element, DISABLED, 'true');
        this.renderer.setAttribute(element, TAG_NAME + "-" + DISABLED, '');
        
        // disabling anchor tab keyboard event
        if(TAG_NAME === TAG_ANCHOR){
          this.renderer.setAttribute(element, TAB_INDEX, '-1');
        }
      }
    }else{
      if(element.hasAttribute(TAG_NAME + "-" + DISABLED)){
        if(element.getAttribute('disabled') !== ''){
          this.renderer.removeAttribute(element, DISABLED);
        }
        this.renderer.removeClass(element, DISABLED);
        this.renderer.removeAttribute(element, DISABLED);
        this.renderer.removeAttribute(element, TAG_NAME + "-" + DISABLED, '');

        if(TAG_NAME === TAG_ANCHOR){
          this.renderer.removeAttribute(element, TAG_ANCHOR);
        }
      }
    }
    if(element.children){
      for(let ele of element.children){
        this.disableElementTag(ele);
      }
    }
  }
}