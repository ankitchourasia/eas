import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportAdminReportComponent } from './report-admin-report.component';
import { ReportAdminReportHomeComponent } from './report-admin-report-home/report-admin-report-home.component';
import { ReportAdminReportRoutingModule } from './report-admin-report-routing.module';
import { ReportAdminReportMenuService } from './report-admin-report-menu.service';
import { ReportAdminReportD1ReportComponent } from './report-admin-report-d1-report/report-admin-report-d1-report.component';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from '@eas-directives/directive.module';



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
    ReportAdminReportHomeComponent
  ],
  providers: [
    ReportAdminReportMenuService
  ]
})
export class ReportAdminReportModule { }
