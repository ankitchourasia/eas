import {trigger, animate, style, group, query as q, transition} from '@angular/animations';
const query = (s,a,o={optional:true})=>q(s,a,o);

export const routerTransition = trigger('routerTransition', [
  transition('* => *', [
    query(':enter, :leave', style({ position: 'fixed', width:'100%',height:'100%' })),
    query(':enter', style({ transform: 'translateX(100%)' })),
    
    group([
      query(':leave', [style({ opacity: 0.0, transform: 'translateX(0%)' }),
        animate('1.0s ease-in-out', style({transform: 'translateX(-100%)'}))
      ]),
      query(':enter', [// style({ opacity: 1, transform: 'scale(1.1)' }),  
        animate('1.0s ease-in-out', style({transform: 'translateX(0%)'})),
      ])
    ]),
  ]),
]);

// ##########################################################################################################################################

export const fadeAnimation = trigger('fadeAnimation', [
  
  // The '* => *' will trigger the animation to change between any two states
  transition('* => *', [
    
    // The query function has three params.
    // First is the event, so this will apply on entering or when the element is added to the DOM.
    // Second is a list of styles or animations to apply.
    // Third we add a config object with optional set to true, this is to signal
    // angular that the animation may not apply as it may or may not be in the DOM.
    query(':enter',[style({ opacity: 0 })],{ optional: true }),
    
    // here we apply a style and use the animate function to apply the style over 0.3 seconds
    query(':leave',[style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))],{ optional: true }),
    
    query(':enter',[style({ opacity: 0 }), animate('0.3s', style({ opacity: 1 }))],{ optional: true })
  ])
]);

//Example:
// <nav> <a routerLink="">home</a> <a routerLink="about">about</a> </nav>
// <div [@fadeAnimation]="o.isActivated ? o.activatedRoute : ''"> <router-outlet #o="outlet"></router-outlet></div>

// ##########################################################################################################################################
