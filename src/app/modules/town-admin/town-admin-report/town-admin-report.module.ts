import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TownAdminReportComponent } from './town-admin-report.component';
import { TownAdminReportHomeComponent } from './town-admin-report-home/town-admin-report-home.component';
import { TownAdminReportRoutingModule } from './town-admin-report-routing.module';
import { TownAdminReportMenuService } from './town-admin-report-menu.service';
import { TownAdminReportD1ReportComponent } from './town-admin-report-d1-report/town-admin-report-d1-report.component';
import { FormsModule } from '@angular/forms';
import { TownAdminReportD4ReportComponent } from './town-admin-report-d4-report/town-admin-report-d4-report.component';
import { TownAdminReportD7ReportComponent } from './town-admin-report-d7-report/town-admin-report-d7-report.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TownAdminReportRoutingModule
  ],
  declarations: [
    TownAdminReportComponent,
    TownAdminReportD1ReportComponent,
    TownAdminReportHomeComponent,
    TownAdminReportD4ReportComponent,
    TownAdminReportD7ReportComponent
  ],
  providers: [
    TownAdminReportMenuService
  ]
})
export class TownAdminReportModule { }
