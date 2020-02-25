import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class AnimateService {
  
    constructor() { }

    // With this subject you can save the sidenav state and consumed later into other pages.
    public sizeAnimeState$: Subject<boolean> = new Subject();

    public balloonAnimeState$: Subject<boolean> = new Subject();

    public sidebarAnimeState$: Subject<boolean> = new Subject();

    public flipAnimeState$: Subject<boolean> = new Subject();

    sizeAnime(state: boolean){
        return state ? 'initial' : 'final';
    }

    balloonAnime(state: boolean){
        return state ? 'initial' : 'final';
    }

    sidebarAnimate(state: boolean){
        console.log(state);
        return state ? 'in' : 'out';
    }

    flipAnimate(state: boolean){
        return state ? 'active' : 'inactive';
    }

    showHideAnimate(state: boolean){
        return state ? 'show' : 'hide';
    }
  }