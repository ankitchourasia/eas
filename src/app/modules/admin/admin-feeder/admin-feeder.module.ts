import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminFeederAddComponent } from './admin-feeder-add/admin-feeder-add.component';
import { AdminFeederViewComponent } from './admin-feeder-view/admin-feeder-view.component';
import { AdminFeederReadingAddComponent } from './admin-feeder-reading-add/admin-feeder-reading-add.component';
import { AdminFeederReadingViewComponent } from './admin-feeder-reading-view/admin-feeder-reading-view.component';
import { AdminFeederAbsentReadingViewComponent } from './admin-feeder-absent-reading-view/admin-feeder-absent-reading-view.component';
import { FeederComponentModule } from '@eas-components/feeder/feeder-component.module';
import { AdminFeederTndLossReportComponent } from './admin-feeder-tnd-loss-report/admin-feeder-tnd-loss-report.component';
import { AdminFeederAtncLossReportComponent } from './admin-feeder-atnc-loss-report/admin-feeder-atnc-loss-report.component';
import { AdminFeederTndLossReportWithoutHtComponent } from './admin-feeder-tnd-loss-report-without-ht/admin-feeder-tnd-loss-report-without-ht.component';

@NgModule({
  imports: [
    CommonModule,
    FeederComponentModule,
  ],
  declarations: [
    AdminFeederAddComponent,
    AdminFeederViewComponent,
    AdminFeederReadingAddComponent,
    AdminFeederReadingViewComponent,
    AdminFeederAbsentReadingViewComponent,
    AdminFeederTndLossReportComponent,
    AdminFeederAtncLossReportComponent,
    AdminFeederTndLossReportWithoutHtComponent,
  ]
})
export class AdminFeederModule { }
