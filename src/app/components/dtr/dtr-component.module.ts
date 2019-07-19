import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DtrAddComponent } from './dtr-add/dtr-add.component';
import { DtrViewComponent } from './dtr-view/dtr-view.component';
import { DirectiveModule } from '@eas-directives/directive.module';
import { PaginationServiceModule } from '@eas-services/pagination/pagination-service.module';
import { DtrReadViewComponent } from './dtr-read-view/dtr-read-view.component';
import { DtrLossReportComponent } from './dtr-loss-report/dtr-loss-report.component';
import { DtrReadAddComponent } from './dtr-read-add/dtr-read-add.component';
import { DtrAddInitialReadComponent } from './dtr-add-initial-read/dtr-add-initial-read.component';

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
    DtrAddInitialReadComponent,
    DtrReadAddComponent,
    DtrReadViewComponent,
    DtrLossReportComponent,
  ],
  exports: [
    DtrAddComponent,
    DtrViewComponent,
    DtrAddInitialReadComponent,
    DtrReadAddComponent,
    DtrReadViewComponent,
    DtrLossReportComponent
  ],
})
export class DtrComponentModule { }
