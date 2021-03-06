import {ComponentRef} from '@angular/core';
import { ModalComponent } from './modal.component';
import { ModalBackdropComponent } from './modal-backdrop.component';
import { ContentRef } from './util';
  
  /**
   * A reference to the newly opened modal returned by the `ModalService.open()` method.
   */
  export class ModalRef {
    private _resolve: (result?: any) => void;
    private _reject: (reason?: any) => void;
  
    /**
     * The instance of a component used for the modal content.
     *
     * When a `TemplateRef` is used as the content, will return `undefined`.
     */
    get componentInstance(): any {
      if (this._contentRef.componentRef) {
        return this._contentRef.componentRef.instance;
      }
    }
  
    /**
     * The promise that is resolved when the modal is closed and rejected when the modal is dismissed.
     */
    result: Promise<any>;
  
    constructor(
        private _windowCmptRef: ComponentRef<ModalComponent>, private _contentRef: ContentRef,
        private _backdropCmptRef?: ComponentRef<ModalBackdropComponent>, private _beforeDismiss?: Function) {
      _windowCmptRef.instance.dismissEvent.subscribe((reason: any) => { this.dismiss(reason); });
  
      this.result = new Promise((resolve, reject) => {
        this._resolve = resolve;
        this._reject = reject;
      });
      this.result.then(null, () => {});
    }
  
    /**
     * Closes the modal with an optional `result` value.
     *
     * The `ModalRef.result` promise will be resolved with the provided value.
     */
    close(result?: any): void {
      if (this._windowCmptRef) {
        this._resolve(result);
        this._removeModalElements();
      }
    }
  
    private _dismiss(reason?: any) {
      this._reject(reason);
      this._removeModalElements();
    }
  
    /**
     * Dismisses the modal with an optional `reason` value.
     *
     * The `ModalRef.result` promise will be rejected with the provided value.
     */
    dismiss(reason?: any): void {
      if (this._windowCmptRef) {
        if (!this._beforeDismiss) {
          this._dismiss(reason);
        } else {
          const dismiss = this._beforeDismiss();
          if (dismiss && dismiss.then) {
            dismiss.then(
                result => {
                  if (result !== false) {
                    this._dismiss(reason);
                  }
                },
                () => {});
          } else if (dismiss !== false) {
            this._dismiss(reason);
          }
        }
      }
    }
  
    private _removeModalElements() {
      const windowNativeEl = this._windowCmptRef.location.nativeElement;
      windowNativeEl.parentNode.removeChild(windowNativeEl);
      this._windowCmptRef.destroy();
  
      if (this._backdropCmptRef) {
        const backdropNativeEl = this._backdropCmptRef.location.nativeElement;
        backdropNativeEl.parentNode.removeChild(backdropNativeEl);
        this._backdropCmptRef.destroy();
      }
  
      if (this._contentRef && this._contentRef.viewRef) {
        this._contentRef.viewRef.destroy();
      }
  
      this._windowCmptRef = null;
      this._backdropCmptRef = null;
      this._contentRef = null;
    }
  }