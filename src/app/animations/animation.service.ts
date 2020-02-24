import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class AnimateService {
  
    constructor() { }

    sizeAnime(state: boolean){
        return state ? 'initial' : 'final';
    }

    balloonAnime(state: boolean){
        return state ? 'initial' : 'final';
    }

    sidebarAnimate(state: boolean){
        return state ? 'in' : 'out';
    }

    flipAnimate(state: boolean){
        return state ? 'active' : 'inactive';
    }
  }