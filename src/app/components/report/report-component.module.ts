import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportD1Component } from './report-d1/report-d1.component';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from '@eas-directives/directive.module';
import { ReportD7Component } from './report-d7/report-d7.component';
import { ReportD4Component } from './report-d4/report-d4.component';
import { ReportD5Component } from './report-d5/report-d5.component';
import { ReportNscMonitoringComponent } from './report-nsc-monitoring/report-nsc-monitoring.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule,
  ],
  declarations: [ReportD1Component, ReportD7Component, ReportD4Component, ReportD5Component, ReportNscMonitoringComponent],
  exports: [ReportD1Component, ReportD7Component, ReportD4Component, ReportD5Component, ReportNscMonitoringComponent]
})
export class ReportComponentModule { }
