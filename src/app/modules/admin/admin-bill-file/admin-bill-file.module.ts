import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBillFileUploadComponent } from './admin-bill-file-upload/admin-bill-file-upload.component';
import { BillFileComponentModule } from '@eas-components/bill-file/bill-file-component.module';

@NgModule({
  imports: [
    CommonModule,
    BillFileComponentModule
  ],
  declarations: [AdminBillFileUploadComponent],
})
export class AdminBillFileModule { }
