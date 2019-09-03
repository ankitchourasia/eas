import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminReportD1Component } from './admin-report-d1/admin-report-d1.component';
import { AdminReportD2Component } from './admin-report-d2/admin-report-d2.component';
import { AdminReportD3Component } from './admin-report-d3/admin-report-d3.component';
import { AdminReportD4Component } from './admin-report-d4/admin-report-d4.component';
import { AdminReportD5Component } from './admin-report-d5/admin-report-d5.component';
import { AdminReportD6Component } from './admin-report-d6/admin-report-d6.component';
import { AdminReportD7Component } from './admin-report-d7/admin-report-d7.component';
import { ReportComponentModule } from '@eas-components/report/report-component.module';
import { AdminReportNscMonitoringComponent } from './admin-report-nsc-monitoring/admin-report-nsc-monitoring.component';

@NgModule({
  imports: [
    CommonModule,
    ReportComponentModule
  ],
  declarations: [
    AdminReportD1Component, 
    AdminReportD2Component, 
    AdminReportD3Component, 
    AdminReportD4Component, 
    AdminReportD5Component, 
    AdminReportD6Component, 
    AdminReportD7Component, 
    AdminReportNscMonitoringComponent
  ],
  
})
export class AdminReportModule { }
