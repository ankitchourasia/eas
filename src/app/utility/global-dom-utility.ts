import { Injectable, Renderer, Renderer2 } from '@angular/core';

@Injectable()
export class GlobalDOMUtility {
    public readonly CLASS_NAME : string = "GlobalDOMUtility ";

    constructor() { }

    /**
     * Function to fire focus event on found element
     * with passed elementId
     * @param elementId 
     */
    public focusOnElement(elementId: string, renderer : Renderer, renderer2 : Renderer2) {
        const element = document.getElementById(elementId) as HTMLElement;
        if (element && renderer) {
            renderer.invokeElementMethod(element, 'focus');
            // element.focus()
            // element['focus'].apply(element);
            // renderer2.selectRootElement(`#${elementId}`, true).focus();
        }
    }

    /**
     * Function to click element with passed elementId
     * @param elementId 
     */
    public clickElement(elementId: string, renderer : Renderer, renderer2 : Renderer2) {
        const element = document.getElementById(elementId) as HTMLElement;
        if (element && renderer) {
            renderer.invokeElementMethod(element, 'click');
            // element.click();
            // element['click'].apply(element);
            // renderer2.selectRootElement(`#${elementId}`, true).click();
        }
    }

    /**
     * Function to enable, disabled element with passed elementId
     * @param elementId 
     */
    public enableElement(elementId: string, renderer : Renderer, renderer2 : Renderer2) {
        const element = document.getElementById(elementId) as HTMLElement;
        if (element && renderer) {
            renderer.setElementAttribute(element, 'disabled', null);
            // element.removeAttribute('disabled');
            // element.setAttribute('disabled', null)
            // renderer2.setAttribute(element, 'disabled', null);
            // renderer2.removeAttribute(element, 'disabled');
            // renderer2.setProperty(element, 'disabled', false);
        }
    }

    /**
     * Function to disable element with passed elementId
     * @param elementId 
     */
    public disableElement(elementId: string, renderer : Renderer, renderer2 : Renderer2) {
        const element = document.getElementById(elementId) as HTMLElement;
        if (element && renderer) {
            renderer.setElementAttribute(element, 'disabled', "true");
            // element.setAttribute('disabled', "true")
            // renderer2.setAttribute(element, 'disabled', 'true'); //attribute is a HTML property
            // renderer2.setProperty(element, 'disabled', true); //property is a DOM property
        }
    }

    public scrollIntoViewElement(elementId: string, renderer : Renderer, renderer2 : Renderer2) {
        const element = document.getElementById(elementId) as HTMLElement;
        if(element && renderer){
            renderer.invokeElementMethod(element, "scrollIntoView");
            // element.scrollIntoView({ behavior: 'smooth', block: "start" });
            // element['scrollIntoView'].apply(element, { behavior: 'smooth', block: "start" });
            // renderer2.selectRootElement(`#${elementId}`, true).scrollIntoView({ behavior: 'smooth', block: "start" });
        }
    }
}
