import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillFileUploadComponent } from './bill-file-upload/bill-file-upload.component';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from '@eas-directives/directive.module';
import { PaginationServiceModule } from '@eas-services/pagination/pagination-service.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule,
    // PaginationServiceModule
  ],
  declarations: [BillFileUploadComponent],
  exports: [BillFileUploadComponent],
})
export class BillFileComponentModule { }
