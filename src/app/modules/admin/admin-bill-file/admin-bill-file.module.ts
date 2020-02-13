import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBillFileUploadComponent } from './admin-bill-file-upload/admin-bill-file-upload.component';
import { BillFileComponentModule } from '@eas-components/bill-file/bill-file-component.module';
import { AdminBillFileComponent } from './admin-bill-file.component';
import { AdminBillFileHomeComponent } from './admin-bill-file-home/admin-bill-file-home.component';
import { AdminBillFileRoutingModule } from './admin-bill-file-routing.module';
import { AdminBillFileMenuService } from './admin-bill-file-menu.service';

@NgModule({
  imports: [
    CommonModule,
    BillFileComponentModule,
    AdminBillFileRoutingModule
  ],
  declarations: [
    AdminBillFileComponent,
    AdminBillFileHomeComponent,
    AdminBillFileUploadComponent
  ],
  providers: [
    AdminBillFileMenuService
  ]
})
export class AdminBillFileModule { }
