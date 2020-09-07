import { Injectable } from '@angular/core';
declare var $:any;//import $ from 'jQuery';

@Injectable({providedIn: 'root'})
export class GlobalCSSUtility {
  
    constructor () {}

    setProperty(propertyName: string, propertyValue: any){
        document.documentElement.style.setProperty(`--${propertyName}`, propertyValue);
    }

    getInnerWidth(elementId: string): any{
        return $(`#${elementId}`).innerWidth();
    }

    getInnerHeight(elementId: string): any{
        return $(`#${elementId}`).innerHeight();
    }

    getOuterWidth(elementId: string): any{
        return $(`#${elementId}`).outerWidth();
    }

    getOuterHeight(elementId: string): any{
        return $(`#${elementId}`).outerHeight();
    }
    
}