import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeederComponentModule } from '@eas-components/feeder/feeder-component.module';
import { ExportComponentModule } from '@eas-components/export/export-component.module';
import { AdminFeeder11KVAtncLossReportComponent } from './admin-feeder-11kv-atnc-loss-report/admin-feeder-11kv-atnc-loss-report.component';
import { AdminFeeder11KVAddComponent } from './admin-feeder-11kv-add/admin-feeder-11kv-add.component';
import { AdminFeeder11KVViewComponent } from './admin-feeder-11kv-view/admin-feeder-11kv-view.component';
import { AdminFeeder11KVTndLossReportComponent } from './admin-feeder-11kv-tnd-loss-report/admin-feeder-11kv-tnd-loss-report.component';
import { AdminFeeder11KVTndLossReportWithoutHtComponent } from './admin-feeder-11kv-tnd-loss-report-without-ht/admin-feeder-11kv-tnd-loss-report-without-ht.component';
import { AdminFeeder11KVInitialReadAddComponent } from './admin-feeder-11kv-initial-read-add/admin-feeder-11kv-initial-read-add.component';
import { AdminFeeder11KVMappingAddComponent } from './admin-feeder-11kv-mapping-add/admin-feeder-11kv-mapping-add.component';
import { AdminFeeder11KVInterruptionAddComponent } from './admin-feeder-11kv-interruption-add/admin-feeder-11kv-interruption-add.component';
import { AdminFeeder11KVReadAddComponent } from './admin-feeder-11kv-read-add/admin-feeder-11kv-read-add.component';
import { AdminFeeder11KVReadViewComponent } from './admin-feeder-11kv-read-view/admin-feeder-11kv-read-view.component';
import { AdminFeeder11KVAbsentReadViewComponent } from './admin-feeder-11kv-absent-read-view/admin-feeder-11kv-absent-read-view.component';
import { AdminFeeder11KVExportPointAddComponent } from './admin-feeder-11kv-export-point-add/admin-feeder-11kv-export-point-add.component';
import { AdminFeeder11KVExportPointViewComponent } from './admin-feeder-11kv-export-point-view/admin-feeder-11kv-export-point-view.component';
import { AdminFeeder11KVExportPointReadAddComponent } from './admin-feeder-11kv-export-point-read-add/admin-feeder-11kv-export-point-read-add.component';
import { AdminFeeder11KVExportPointReadViewComponent } from './admin-feeder-11kv-export-point-read-view/admin-feeder-11kv-export-point-read-view.component';
import { AdminFeeder11KVHomeComponent } from './admin-feeder-11kv-home/admin-feeder-11kv-home.component';
import { AdminFeeder11KVComponent } from './admin-feeder-11kv.component';
import { AdminFeeder11KVRoutingModule } from './admin-feeder-11kv-routing.module';
import { AdminFeeder11KVMenuService } from './admin-feeder-11kv-menu.service';
import { Admin11KVExportAbsentReadComponent } from './admin-11kv-export-absent-read/admin-11kv-export-absent-read.component';
import { AdminFeeder11KVLossDataComponent } from './admin-feeder-11kv-loss-data/admin-feeder-11kv-loss-data.component';
import { FormsModule } from '@angular/forms';
import { AdminFeeder11KVLossReportComponent } from './admin-feeder-11kv-loss-report/admin-feeder-11kv-loss-report.component';

@NgModule({
  imports: [
    CommonModule,
    FeederComponentModule,
    ExportComponentModule,
    FormsModule,
    AdminFeeder11KVRoutingModule
  ],
  declarations: [
    AdminFeeder11KVComponent,
    AdminFeeder11KVHomeComponent,
    AdminFeeder11KVAddComponent,
    AdminFeeder11KVViewComponent,
    AdminFeeder11KVReadAddComponent,
    AdminFeeder11KVReadViewComponent,
    AdminFeeder11KVAbsentReadViewComponent,
    AdminFeeder11KVTndLossReportComponent,
    AdminFeeder11KVAtncLossReportComponent,
    AdminFeeder11KVTndLossReportWithoutHtComponent,
    AdminFeeder11KVInitialReadAddComponent,
    AdminFeeder11KVMappingAddComponent,
    AdminFeeder11KVInterruptionAddComponent,
    AdminFeeder11KVExportPointAddComponent,
    AdminFeeder11KVExportPointViewComponent,
    AdminFeeder11KVExportPointReadAddComponent,
    AdminFeeder11KVExportPointReadViewComponent,
    Admin11KVExportAbsentReadComponent,
    AdminFeeder11KVLossDataComponent,
    AdminFeeder11KVLossReportComponent
  ],
  providers: [
    AdminFeeder11KVMenuService
  ]
})
export class AdminFeeder11KVModule { }
