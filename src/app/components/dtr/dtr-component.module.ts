import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DtrAddComponent } from './dtr-add/dtr-add.component';
import { DtrViewComponent } from './dtr-view/dtr-view.component';
import { DirectiveModule } from '@eas-directives/directive.module';
import { PaginationServiceModule } from '@eas-services/pagination/pagination-service.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule,
    PaginationServiceModule
  ],
  declarations: [
    DtrAddComponent,
    DtrViewComponent
  ],
  exports: [
    DtrAddComponent,
    DtrViewComponent
  ],
})
export class DtrComponentModule { }
