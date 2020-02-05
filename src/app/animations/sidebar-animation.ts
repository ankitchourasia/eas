import { trigger, state, style, transition, animate } from "@angular/animations";
    

export const sidebarTransition = trigger('sidebarInOut', [
    state('in', style({transform: 'translate3d(0,0,0)'})),
    state('out', style({transform: 'translate3d(100%, 0, 0)'})),
    transition('in => out', animate('400ms ease-in-out')),
    transition('out => in', animate('400ms ease-in-out'))
  ]);


  export const sidebarAnimate = trigger('sidebarAnimate', [
    state('out', style({flexBasis: '0', maxWidth: '0', visibility: 'hidden'})),
    state('in', style({flexBasis: '20%', maxWidth: '20%'})),
    transition('in => out', animate('400ms ease-in')),
    transition('out => in', animate('400ms ease-out'))
  ]);

  export const mainContainerAnimate = trigger('mainContainerAnimate', [
    state('in', style({flexBasis: '80%', maxWidth: '80%'})),
    state('out', style({flexBasis: '100%', maxWidth: '100%'})),
    transition('in => out', animate('400ms ease-in')),
    transition('out => in', animate('400ms ease-out'))
  ]);


