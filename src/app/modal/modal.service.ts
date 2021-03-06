import { Injectable, ComponentFactoryResolver, Injector } from '@angular/core';
import { ModalConfig } from './modal-config';
import { ModalOptions } from './modal-options';
import { ModalStack } from './modal-stack';
import { ModalRef } from './modal-ref';

@Injectable({providedIn: 'root'})
export class ModalService {

  constructor(private _moduleCFR: ComponentFactoryResolver, private _injector: Injector, 
    private _modalStack: ModalStack, private _config: ModalConfig) {}

/**
 * Opens a new modal window with the specified content and supplied options.
 *
 * Content can be provided as a `TemplateRef` or a component type. If you pass a component type as content,
 * then instances of those components can be injected with an instance of the `ModalActive` class. You can then
 * use `ModalActive` methods to close / dismiss modals from "inside" of your component.
 *
 * Also see the [`ModalOptions`](#/components/modal/api#ModalOptions) for the list of supported options.
 */
open(content: any, options: ModalOptions = {}): ModalRef {
  const combinedOptions = Object.assign({}, this._config, options);
  return this._modalStack.open(this._moduleCFR, this._injector, content, combinedOptions);
}

/**
 * Dismisses all currently displayed modal windows with the supplied reason.
 *
 * @since 3.1.0
 */
dismissAll(reason?: any) { this._modalStack.dismissAll(reason); }

/**
 * Indicates if there are currently any open modal windows in the application.
 *
 * @since 3.3.0
 */
hasOpenModals(): boolean { return this._modalStack.hasOpenModals(); }
}