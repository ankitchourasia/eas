import { Component, Input, HostListener } from '@angular/core';
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
export class PopoverDirective {
  
  dataToggle: string;
  title : string = "";
  content: string = "";
  trigger: string = "hover";
  placement: string = "auto";
  
  constructor(private globalResources : GlobalResources) { }

  @Input("data-toggle")
  set setDataToggle(dataToggle : string){
    this.dataToggle = dataToggle;
  }

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

  @HostListener('mouseenter') onAnyEvent(event: any) {
    this.globalResources.popover(this.dataToggle, this.title, this.content, this.trigger, this.placement);
    // this.popover();
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
