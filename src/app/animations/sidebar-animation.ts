import { trigger, state, style, transition, animate } from "@angular/animations";

// Understanding Angular Animation States
// Animation involves transition from one state of an element to another state. Angular defines three different states for an element:

// 1) Void state — represents the state of an element which is not part of the DOM. 
//    This state occurs when an element is created but not yet placed in the DOM or 
//    the element is removed from the DOM. This state is useful when we want to create animation
// while adding or removing an element from our DOM. To define this state in our code we use the keyword void.

// 2) The wildcard state — This is also known as the default state of the element. 
//    The styles defined for this state are applicable to the element regardless of its current animation state. 
//    To define this state in our code we use the * symbol.

// 3) Custom state — This is the custom state of the element and it needs to be defined explicitly in the code. 
//    To define this state in our code, we can use any custom name of our choice.  
//-------------------------------------------------------------------------------------------------------------------------------------------

// Animation Transition Timing
// To show the animation transition from one state to another, we define animation transition timing in our application.

// Angular provides the following three timing properties:

// 1) Duration
//    This property represents the time our animation takes to complete from start (initial state) to finish (final state). 
//    We can define the duration of animation in the following three ways:

// *) Using an integer value to represent the time in milliseconds. E.g.- 500
// *) Using a string value to represent the time in milliseconds. E.g. — ‘500ms’
// *) Using a string value to represent the time in seconds. E.g. — ‘0.5s’



// 2) Delay
//    This property represents the duration between the animation trigger and the beginning of the actual transition. 
//    This property also follows the same syntax as duration. To define the delay, we need to add the delay value after 
//    the duration value in a string format — ‘ Duration Delay’. Delay is an optional property.

// For example:

// ‘0.3s 500ms’. This means the transition will wait for 500ms and then run for 0.3s.


// 3) Easing
//    This property represents how the animation accelerates or decelerates during its execution. 
//    We can define the easing by adding it as the third variable in the string after duration and delay. 
//    If the delay value is not present, then easing will be the second value. This is also an optional property.

// For example:

// (*) ‘0.3s 500ms ease-in’ — This means the transition will wait for 500ms and then run for 0.3s (300ms) with ease-in effect.
// (*) ‘300ms ease-out’. — This means the transition will run for 300ms (0.3s) with ease-out effect.

//------------------------------------------------------------------------------------------------------------------------------------------
// Understanding the Angular Animation Syntax
// We will write our animation code inside the component’s metadata. The syntax for the animation is shown below:
// @Component({
//   // other component properties.
//     animations: [trigger('triggerName'), [
//         state('stateName', style())
//         transition('stateChangeExpression', [Animation Steps])
//       ]
//     ]
// })

// ##########################################################################################################################################

export const slideInOutAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('slideInOutAnimation', [

        // end state styles for route container (host)
        state('*', style({
            // the view covers the whole screen with a semi tranparent background
            position: 'fixed', top: 0,left: 0,right: 0,bottom: 0,backgroundColor: 'rgba(0, 0, 0, 0.8)'
        })),

        // route 'enter' transition
        transition(':enter', [

            // styles at start of transition
            style({
                // start with the content positioned off the right of the screen, 
                // -400% is required instead of -100% because the negative position adds to the width of the element
                right: '-400%',

                // start with background opacity set to 0 (invisible)
                backgroundColor: 'rgba(0, 0, 0, 0)'
            }),

            // animation and styles at end of transition
            animate('.5s ease-in-out', style({
                // transition the right position to 0 which slides the content into view
                right: 0,

                // transition the background opacity to 0.8 to fade it in
                backgroundColor: 'rgba(0, 0, 0, 0.8)'
            }))
        ]),

        // route 'leave' transition
        transition(':leave', [
            // animation and styles at end of transition
            animate('.5s ease-in-out', style({
                // transition the right position to -400% which slides the content out of view
                right: '-400%',

                // transition the background opacity to 0 to fade it out
                backgroundColor: 'rgba(0, 0, 0, 0)'
            }))
        ])
    ]);

    //Example:
    // @Component({
    //   templateUrl: 'product-add-edit.component.html',
  
    //   // make slide in/out animation available to this component
    //   animations: [slideInOutAnimation],
  
    //   // attach the slide in/out animation to the host (root) element of this component
    //   host: { '[@slideInOutAnimation]': '' }
    // })
// ##########################################################################################################################################

export const sidebarTransition = trigger('sidebarInOut', [
    state('in', style({transform: 'translate3d(0,0,0)'})),
    state('out', style({transform: 'translate3d(100%, 0, 0)'})),
    transition('in => out', animate('400ms ease-in-out')),
    transition('out => in', animate('400ms ease-in-out'))
  ]);

// ##########################################################################################################################################

  export const sidebarAnimate = trigger('sidebarAnimate', [
    state('out', style({flexBasis: '0', maxWidth: '0', visibility: 'hidden'})),
    state('in', style({flexBasis: '20%', maxWidth: '20%'})),
    transition('in => out', animate('400ms ease-in')),
    transition('out => in', animate('400ms ease-out'))
  ]);

// ##########################################################################################################################################

  export const mainContainerAnimate = trigger('mainContainerAnimate', [
    state('in', style({flexBasis: '80%', maxWidth: '80%'})),
    state('out', style({flexBasis: '100%', maxWidth: '100%'})),
    transition('in => out', animate('400ms ease-in')),
    transition('out => in', animate('400ms ease-out'))
  ]);

// ##########################################################################################################################################

  //Change Size Animation
  export const changeDivSizeAnimate = trigger('changeDivSize', [
    state('initial', style({backgroundColor: 'green', width: '100px', height: '100px'})),
    state('final', style({backgroundColor: 'red', width: '200px', height: '200px'})),
    transition('initial => final', animate('1500ms')),
    transition('final => initial', animate('1000ms'))
  ]);
  // <div (click)="changeState()" [@changeDivSize]=currentState></div>

// ##########################################################################################################################################

  //Balloon effect animation
  export const balloonEffectAnimate = trigger('balloonEffect', [
    state('initial', style({backgroundColor: 'green', transform: 'scale(1)'})),
    state('final', style({backgroundColor: 'red', transform: 'scale(1.5)'})),
    transition('final => initial', animate('1000ms')),
    transition('initial => final', animate('1500ms'))
  ]);
  // <div (click)="changeState()" style="width:100px;height:100px; border-radius: 100%; margin: 3rem; background-color: green" [@balloonEffect]=currentState> </div>
  
// ##########################################################################################################################################

  //Fade In and Fade Out animation

  export const fadeInAnimation =
  // trigger name for attaching this animation to an element using the [@triggerName] syntax
  trigger('fadeInAnimation', [

      // route 'enter' transition
      transition(':enter', [

          // css styles at start of transition
          style({ opacity: 0 }),

          // animation and styles at end of transition
          animate('.8s', style({ opacity: 1 }))
      ]),
  ]);

  // import { fadeInAnimation } from '../_animations/index';
  // @Component({ 
  //     templateUrl: 'home.component.html',
  //     // make fade in animation available to this component
  //     animations: [fadeInAnimation],
  //     // attach the fade in animation to the host (root) element of this component
  //     host: { '[@fadeInAnimation]': '' }
  // })
//----------------------------------OTHER EXAMPLE-----------------------------------------------------------------------------------------
  export const fadeInOutAnimate = trigger('fadeInOut', [
    state('void', style({ opacity: 0 })),
    transition('void <=> *', animate(1000))
  ]);
  // Here we have defined the trigger fadeInOut. When the element is added to the DOM it is a transition from void to wildcard (*) state. 
  // This is denoted using void =>; *. When the element is removed from the DOM, it is a transition from wildcard (*) to void state. 
  // This is denoted using * =>; void.

  // When we use the same animation timing for both directions of the animation, we use the shorthand syntax <;=>. 
  // As defined in this trigger, the animation from void =&gt; * and * => void will take 1000ms to complete.

  //Example:
  // <button (click)="addItem()">Add List</button> // <button (click)="removeItem()">Remove List</button>
  // <div style="width:200px; margin-left: 20px">
  //   <ul> <li *ngFor="let list of listItem" [@fadeInOut]> {{list}} </li></ul>
  // </div>  
// ##########################################################################################################################################

  //Enter and Leave animation
  //When adding to the DOM, the element will enter the screen from the left. When deleting, the element will leave the screen from the right.

  // The transition from void => * and * => void is very common. Therefore, Angular provides aliases for these animations:

  // for void => * we can use ‘:enter’
  // for * => void we can use ‘:leave’
  // The aliases make these transitions more readable and easier to understand.

  export const EnterLeaveAnimate = trigger('EnterLeave', [
    state('flyIn', style({ transform: 'translateX(0)' })),
    transition(':enter', [style({ transform: 'translateX(-100%)' }),animate('0.5s 300ms ease-in')]),
    transition(':leave', [animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))])
  ]);
  // Here we have defined the trigger EnterLeave. The ‘:enter’ transition will wait for 300ms and then run for 0.5s with an ease-in effect. 
  // Whereas the ‘:leave transition will run for 0.3s with an ease-out effect.
  //Example:
  // <button (click)="addItem()">Add List</button><button (click)="removeItem()">Remove List</button>
  // <div style="width:200px; margin-left: 20px">
  //   <ul><li *ngFor="let list of listItem" [@EnterLeave]="'flyIn'">{{list}}</li></ul>
  // </div>

// ##########################################################################################################################################

  //Flip animation
  export const flipAnimate = trigger('flipAnimate', [
    state('active', style({transform: 'rotateY(180deg'})),
    state('inactive', style({transform: 'rotateY(0'})),
    transition('active => inactive', animate('400ms ease-out')),
    transition('inactive => active', animate('400ms ease-in'))
  ]);
  
// ##########################################################################################################################################
