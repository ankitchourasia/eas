import {Injectable, Injector} from '@angular/core';

/**
 * Options available when opening new modal windows with `ModalService.open()` method.
 */
export interface ModalOptions {
  /**
   * `aria-labelledby` attribute value to set on the modal window.
   *
   * @since 2.2.0
   */
  ariaLabelledBy?: string;

  /**
   * If `true`, the backdrop element will be created for a given modal.
   *
   * Alternatively, specify `'static'` for a backdrop which doesn't close the modal on click.
   *
   * Default value is `true`.
   */
  backdrop?: boolean | 'static';

  /**
   * Callback right before the modal will be dismissed.
   *
   * If this function returns:
   * * `false`
   * * a promise resolved with `false`
   * * a promise that is rejected
   *
   * then the modal won't be dismissed.
   */
  beforeDismiss?: () => boolean | Promise<boolean>;

  /**
   * If `true`, the modal will be centered vertically.
   *
   * Default value is `false`.
   *
   * @since 1.1.0
   */
  centered?: boolean;

  /**
   * A selector specifying the element all new modal windows should be appended to.
   *
   * If not specified, will be `body`.
   */
  container?: string;

  /**
   * The `Injector` to use for modal content.
   */
  injector?: Injector;

  /**
   * If `true`, the modal will be closed when `Escape` key is pressed
   *
   * Default value is `true`.
   */
  keyboard?: boolean;

  /**
   * Scrollable modal content (false by default).
   *
   * @since 5.0.0
   */
  scrollable?: boolean;

  /**
   * Size of a new modal window.
   */
  size?: 'sm' | 'lg' | 'xl';

  /**
   * A custom class to append to the modal window.
   */
  windowClass?: string;

  /**
   * A custom class to append to the modal backdrop.
   *
   * @since 1.1.0
   */
  backdropClass?: string;
}
