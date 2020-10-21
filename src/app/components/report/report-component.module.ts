import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportD1Component } from './report-d1/report-d1.component';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from '@eas-directives/directive.module';
import { ReportD7Component } from './report-d7/report-d7.component';
import { ReportD4Component } from './report-d4/report-d4.component';
import { ReportD5Component } from './report-d5/report-d5.component';
import { ReportNscMonitoringComponent } from './report-nsc-monitoring/report-nsc-monitoring.component';
import { ReportD2Component } from './report-d2/report-d2.component';
import { ReportConsumerComplaintsRedressalComponent } from './report-consumer-complaints-redressal/report-consumer-complaints-redressal.component';
import { ReportD3Component } from './report-d3/report-d3.component';
import { ReportFeederJsonFileComponent } from './report-feeder-json-file/report-feeder-json-file.component';
import { TownWiseBillingDataComponent } from './town-wise-billing-data/town-wise-billing-data.component';
import { TownWiseFeederDataComponent } from './town-wise-feeder-data/town-wise-feeder-data.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule
  ],
  declarations: [
    ReportD1Component,
    ReportD7Component,
    ReportD4Component,
    ReportD5Component,
    ReportNscMonitoringComponent,
    ReportD2Component,
    ReportConsumerComplaintsRedressalComponent,
    ReportD3Component, 
    ReportFeederJsonFileComponent, 
    TownWiseBillingDataComponent, 
    TownWiseFeederDataComponent
  ],
 
  exports: [
    ReportD1Component,
    ReportD7Component,
    ReportD4Component,
    ReportD5Component,
    ReportNscMonitoringComponent,
    ReportD2Component,
    ReportConsumerComplaintsRedressalComponent, 
    ReportD3Component,
    ReportFeederJsonFileComponent,
    TownWiseBillingDataComponent,
    TownWiseFeederDataComponent
  ]
})
export class ReportComponentModule { }
