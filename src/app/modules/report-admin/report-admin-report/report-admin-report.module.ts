import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportAdminReportComponent } from './report-admin-report.component';
import { ReportAdminReportHomeComponent } from './report-admin-report-home/report-admin-report-home.component';
import { ReportAdminReportRoutingModule } from './report-admin-report-routing.module';
import { ReportAdminReportMenuService } from './report-admin-report-menu.service';
import { ReportAdminReportD1ReportComponent } from './report-admin-report-d1-report/report-admin-report-d1-report.component';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from '@eas-directives/directive.module';
import { ReportAdminReportD4ReportComponent } from './report-admin-report-d4-report/report-admin-report-d4-report.component';
import { ReportAdminReportD7ReportComponent } from './report-admin-report-d7-report/report-admin-report-d7-report.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule,
    ReportAdminReportRoutingModule
  ],
  declarations: [
    ReportAdminReportComponent,
    ReportAdminReportD1ReportComponent,
    ReportAdminReportHomeComponent,
    ReportAdminReportD4ReportComponent,
    ReportAdminReportD7ReportComponent
  ],
  providers: [
    ReportAdminReportMenuService
  ]
})
export class ReportAdminReportModule { }
