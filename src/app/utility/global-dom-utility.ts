import { Injectable, Renderer } from '@angular/core';

@Injectable()
export class GlobalDOMUtility {
    public readonly CLASS_NAME : string = "GlobalDOMUtility ";

    constructor() { }

    /**
     * Function to fire focus event on found element
     * with passed elementId
     * @param elementId 
     */
    public focusOnElement(elementId: string, renderer : Renderer) {
        const element = document.getElementById(elementId);
        if (element && renderer) {
            renderer.invokeElementMethod(element, 'focus');
        }
    }

    /**
     * Function to click element with passed elementId
     * @param elementId 
     */
    public clickElement(elementId: string, renderer : Renderer) {
        const element = document.getElementById(elementId);
        if (element && renderer) {
            renderer.invokeElementMethod(element, 'click');
        }
    }

    /**
     * Function to enable, disabled element with passed elementId
     * @param elementId 
     */
    public enableElement(elementId: string, renderer : Renderer) {
        const element = document.getElementById(elementId);
        if (element && renderer) {
            renderer.setElementAttribute(element, 'disabled', null);
        }
    }

    /**
     * Function to disable element with passed elementId
     * @param elementId 
     */
    public disableElement(elementId: string, renderer : Renderer) {
        const element = document.getElementById(elementId);
        if (element && renderer) {
            renderer.setElementAttribute(element, 'disabled', "true");
        }
    }
}
