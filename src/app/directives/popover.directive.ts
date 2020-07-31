import { Component, Input, HostListener, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
declare var $:any;
@Component({
  selector: '[popover]',
  template: `
    <div [data-toggle]="dataToggle">
      <ng-content></ng-content>
    </div>
  `
})
export class PopoverDirective implements AfterViewInit{
  
  dataToggle: string;
  title : string = "";
  content: string = "";
  trigger: string = "hover";
  placement: string = "auto";
  
  constructor(private elementRef: ElementRef, private renderer2: Renderer2, private globalResources : GlobalResources) { }

  @Input("title")
  set setTitle(title : string){
    this.title = title;
  }

  @Input("trigger")
  set setTrigger(trigger : string){
    this.trigger = trigger;
  }

  @Input("placement")
  set setPlacement(placement : string){
    this.placement = placement;
  }

  @Input("content")
  set setContent(content : string){
    this.content = content;
  }
  
  @Input("data-toggle")
  set setDataToggle(dataToggle : string){
    this.dataToggle = dataToggle;
  }

  @HostListener('mouseenter') onAnyEvent(event: any) {
    this.globalResources.popover(this.dataToggle, this.title, this.content, this.trigger, this.placement);
    // this.popover();
  }

  ngAfterViewInit() {
  // this.renderer2.listen(this.elementRef.nativeElement, this.trigger, (event) => {
  //     // Do something with 'event'
  //     console.log(event);
  //     this.globalResources.popover(this.dataToggle, this.title, this.content, this.trigger, this.placement);
  //   });
  //   // You can use listenGlobal that will give you access to document, body, etc.
  //   this.renderer2.listen('document', this.trigger, (event) => {
  //     // Do something with 'event'
  //     console.log(event);
  //     this.globalResources.popover(this.dataToggle, this.title, this.content, this.trigger, this.placement);
  //   });
  }

  popover(){
    $('[data-toggle="popover"]').popover(
      {
        title: this.title,
        content: this.content,
        trigger: this.trigger,
        placement: this.placement,
      }
    );
  }

}

//
// Full list of Angular Events

// (click)="myFunction()"      
// (dblclick)="myFunction()"   

// (submit)="myFunction()"

// (blur)="myFunction()"  
// (focus)="myFunction()" 

// (scroll)="myFunction()"

// (cut)="myFunction()"
// (copy)="myFunction()"
// (paste)="myFunction()"

// (keyup)="myFunction()"
// (keypress)="myFunction()"
// (keydown)="myFunction()"

// (mouseup)="myFunction()"
// (mousedown)="myFunction()"
// (mouseenter)="myFunction()"

// (drag)="myFunction()"
// (drop)="myFunction()"
// (dragover)="myFunction()"
