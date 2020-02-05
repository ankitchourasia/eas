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