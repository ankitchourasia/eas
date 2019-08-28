import { ViewRef, ComponentRef, Injectable, Inject } from "@angular/core";
import {fromEvent, Observable} from 'rxjs';
import {filter, map, takeUntil, withLatestFrom} from 'rxjs/operators';
import { DOCUMENT } from "@angular/common";

export enum Key {
  Tab = 9,
  Enter = 13,
  Escape = 27,
  Space = 32,
  PageUp = 33,
  PageDown = 34,
  End = 35,
  Home = 36,
  ArrowLeft = 37,
  ArrowUp = 38,
  ArrowRight = 39,
  ArrowDown = 40
}

export class ContentRef {
  constructor(public nodes: any[], public viewRef?: ViewRef, public componentRef?: ComponentRef<any>) {}
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isDefined(value: any): boolean {
  return value !== undefined && value !== null;
}

const FOCUSABLE_ELEMENTS_SELECTOR = [
  'a[href]', 'button:not([disabled])', 'input:not([disabled]):not([type="hidden"])', 'select:not([disabled])',
  'textarea:not([disabled])', '[contenteditable]', '[tabindex]:not([tabindex="-1"])'
].join(', ');

/**
 * Returns first and last focusable elements inside of a given element based on specific CSS selector
 */
export function getFocusableBoundaryElements(element: HTMLElement): HTMLElement[] {
  const list: HTMLElement[] =
      Array.from(element.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR) as NodeListOf<HTMLElement>)
          .filter(el => el.tabIndex !== -1);
  return [list[0], list[list.length - 1]];
}

/**
 * Function that enforces browser focus to be trapped inside a DOM element.
 *
 * Works only for clicks inside the element and navigation with 'Tab', ignoring clicks outside of the element
 *
 * @param element The element around which focus will be trapped inside
 * @param stopFocusTrap$ The observable stream. When completed the focus trap will clean up listeners
 * and free internal resources
 * @param refocusOnClick Put the focus back to the last focused element whenever a click occurs on element (default to
 * false)
 */
export const focusTrap = (element: HTMLElement, stopFocusTrap$: Observable<any>, refocusOnClick = false) => {
  // last focused element
  const lastFocusedElement$ =
      fromEvent<FocusEvent>(element, 'focusin').pipe(takeUntil(stopFocusTrap$), map(e => e.target));

  // 'tab' / 'shift+tab' stream
  fromEvent<KeyboardEvent>(element, 'keydown')
      .pipe(
          takeUntil(stopFocusTrap$),
          // tslint:disable:deprecation
          filter(e => e.which === Key.Tab),
          // tslint:enable:deprecation
          withLatestFrom(lastFocusedElement$))
      .subscribe(([tabEvent, focusedElement]) => {
        const[first, last] = getFocusableBoundaryElements(element);

        if ((focusedElement === first || focusedElement === element) && tabEvent.shiftKey) {
          last.focus();
          tabEvent.preventDefault();
        }

        if (focusedElement === last && !tabEvent.shiftKey) {
          first.focus();
          tabEvent.preventDefault();
        }
      });

  // inside click
  if (refocusOnClick) {
    fromEvent(element, 'click')
        .pipe(takeUntil(stopFocusTrap$), withLatestFrom(lastFocusedElement$), map(arr => arr[1] as HTMLElement))
        .subscribe(lastFocusedElement => lastFocusedElement.focus());
  }
}



const noop = () => {};



/** Type for the callback used to revert the scrollbar compensation. */
export type CompensationReverter = () => void;
/**
 * Utility to handle the scrollbar.
 *
 * It allows to compensate the lack of a vertical scrollbar by adding an
 * equivalent padding on the right of the body, and to remove this compensation.
 */
@Injectable({providedIn: 'root'})
export class ScrollBar {
  constructor(@Inject(DOCUMENT) private _document: any) {}

  /**
   * Detects if a scrollbar is present and if yes, already compensates for its
   * removal by adding an equivalent padding on the right of the body.
   *
   * @return a callback used to revert the compensation (noop if there was none,
   * otherwise a function removing the padding)
   */
  compensate(): CompensationReverter { return !this._isPresent() ? noop : this._adjustBody(this._getWidth()); }

  /**
   * Adds a padding of the given width on the right of the body.
   *
   * @return a callback used to revert the padding to its previous value
   */
  private _adjustBody(width: number): CompensationReverter {
    const body = this._document.body;
    const userSetPadding = body.style.paddingRight;
    const paddingAmount = parseFloat(window.getComputedStyle(body)['padding-right']);
    body.style['padding-right'] = `${paddingAmount + width}px`;
    return () => body.style['padding-right'] = userSetPadding;
  }

  /**
   * Tells whether a scrollbar is currently present on the body.
   *
   * @return true if scrollbar is present, false otherwise
   */
  private _isPresent(): boolean {
    const rect = this._document.body.getBoundingClientRect();
    return rect.left + rect.right < window.innerWidth;
  }

  /**
   * Calculates and returns the width of a scrollbar.
   *
   * @return the width of a scrollbar on this page
   */
  private _getWidth(): number {
    const measurer = this._document.createElement('div');
    measurer.className = 'modal-scrollbar-measure';

    const body = this._document.body;
    body.appendChild(measurer);
    const width = measurer.getBoundingClientRect().width - measurer.clientWidth;
    body.removeChild(measurer);

    return width;
  }
}