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
import { AdminReportConsumerComplaintsRedressalComponent } from './admin-report-consumer-complaints-redressal/admin-report-consumer-complaints-redressal.component';
import { AdminReportFeederJsonFileComponent } from './admin-report-feeder-json-file/admin-report-feeder-json-file.component';
import { AdminReportHomeComponent } from './admin-report-home/admin-report-home.component';
import { AdminReportComponent } from './admin-report.component';
import { AdminReportRoutingModule } from './admin-report-routing.module';
import { AdminReportMenuService } from './admin-report-menu.service';

@NgModule({
  imports: [
    CommonModule,
    ReportComponentModule,
    AdminReportRoutingModule
  ],
  declarations: [
    AdminReportComponent,
    AdminReportHomeComponent, 
    AdminReportD1Component, 
    AdminReportD2Component, 
    AdminReportD3Component, 
    AdminReportD4Component, 
    AdminReportD5Component, 
    AdminReportD6Component, 
    AdminReportD7Component, 
    AdminReportNscMonitoringComponent, 
    AdminReportConsumerComplaintsRedressalComponent, 
    AdminReportFeederJsonFileComponent, 
  ],
  providers: [
    AdminReportMenuService
  ]
  
})
export class AdminReportModule { }
