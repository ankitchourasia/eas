import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DtrAddComponent } from './dtr-add/dtr-add.component';
import { DtrViewComponent } from './dtr-view/dtr-view.component';
import { DirectiveModule } from '@eas-directives/directive.module';
import { PaginationServiceModule } from '@eas-services/pagination/pagination-service.module';
import { ZoneServiceModule } from '@eas-services/zone/zone-service.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule,
    // ZoneServiceModule,
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
