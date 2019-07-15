import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DtrAddComponent } from './dtr-add/dtr-add.component';
import { DtrViewComponent } from './dtr-view/dtr-view.component';
import { DirectiveModule } from '@eas-directives/directive.module';
import { PaginationServiceModule } from '@eas-services/pagination/pagination-service.module';
import { DtrInitialReadAddComponent } from './dtr-initial-read-add/dtr-initial-read-add.component';
import { DtrReadViewComponent } from './dtr-read-view/dtr-read-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule,
    PaginationServiceModule
  ],
  declarations: [
    DtrAddComponent,
    DtrViewComponent,
    DtrInitialReadAddComponent,
    DtrReadViewComponent
  ],
  exports: [
    DtrAddComponent,
    DtrViewComponent,
    DtrInitialReadAddComponent,
    DtrReadViewComponent
  ],
})
export class DtrComponentModule { }
