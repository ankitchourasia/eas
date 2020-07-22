import { NgModule, ModuleWithProviders} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalBackdropComponent } from './modal-backdrop.component';
import { ModalService } from './modal.service';
export {ModalDismissReasons} from './modal-dismiss-reasons';
export {ModalService } from './modal.service';
export {ModalConfig} from './modal-config';
export {ModalRef} from './modal-ref';
export{ ModalActive} from './modal-active';
export { ModalOptions } from './modal-options';

@NgModule({
  imports: [ CommonModule],
  providers: [ModalService],
  declarations: [ModalComponent, ModalBackdropComponent],
  exports: [ModalComponent, ModalBackdropComponent],
  entryComponents: [ModalComponent, ModalBackdropComponent]
  
})
export class ModalModule {
  public static forRoot(): ModuleWithProviders<ModalModule> {
    return {ngModule: ModalModule, providers: []};
  }
}
