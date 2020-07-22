import { Injectable, Renderer2 } from '@angular/core';

@Injectable()
export class GlobalDOMUtility {
    public readonly CLASS_NAME : string = "GlobalDOMUtility ";

    constructor() { }

    /**
     * Function to fire focus event on found element
     * with passed elementId
     * @param elementId 
     */
    public focusOnElement(elementId: string, renderer : Renderer2) {
        const element = document.getElementById(elementId) as HTMLElement;
        if (element && renderer) {
            element.focus();
            // renderer2.selectRootElement(`#${elementId}`, true).focus();
        }
    }

    /**
     * Function to click element with passed elementId
     * @param elementId 
     */
    public clickElement(elementId: string, renderer : Renderer2) {
        const element = document.getElementById(elementId) as HTMLElement;
        if (element && renderer) {
            element.click();
            // renderer2.selectRootElement(`#${elementId}`, true).click();
        }
    }

    /**
     * Function to enable, disabled element with passed elementId
     * @param elementId 
     */
    public enableElement(elementId: string, renderer : Renderer2) {
        const element = document.getElementById(elementId) as HTMLElement;
        if (element && renderer) {
            __ngRendererSetElementAttributeHelper(renderer, element, 'disabled', null);
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
    public disableElement(elementId: string, renderer : Renderer2) {
        const element = document.getElementById(elementId) as HTMLElement;
        if (element && renderer) {
            __ngRendererSetElementAttributeHelper(renderer, element, 'disabled', "true");
            // element.setAttribute('disabled', "true")
            // renderer2.setAttribute(element, 'disabled', 'true'); //attribute is a HTML property
            // renderer2.setProperty(element, 'disabled', true); //property is a DOM property
        }
    }

    public scrollIntoViewElement(elementId: string, renderer : Renderer2) {
        const element = document.getElementById(elementId) as HTMLElement;
        if(element && renderer){
            element.scrollIntoView();
            // element.scrollIntoView({ behavior: 'smooth', block: "start" });
           // renderer2.selectRootElement(`#${elementId}`, true).scrollIntoView({ behavior: 'smooth', block: "start" });
        }
    }
}

type AnyDuringRendererMigration = any;

function __ngRendererSplitNamespaceHelper(name: AnyDuringRendererMigration) {
    if (name[0] === ":") {
        const match = name.match(/^:([^:]+):(.+)$/);
        return [match[1], match[2]];
    }
    return ["", name];
}

function __ngRendererSetElementAttributeHelper(renderer: AnyDuringRendererMigration, element: AnyDuringRendererMigration, namespaceAndName: AnyDuringRendererMigration, value?: AnyDuringRendererMigration) {
    const [namespace, name] = __ngRendererSplitNamespaceHelper(namespaceAndName);
    if (value != null) {
        renderer.setAttribute(element, name, value, namespace);
    }
    else {
        renderer.removeAttribute(element, name, namespace);
    }
}
