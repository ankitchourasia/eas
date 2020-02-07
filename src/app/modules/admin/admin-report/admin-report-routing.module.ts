import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminReportComponent } from './admin-report.component';
import { AdminReportHomeComponent } from './admin-report-home/admin-report-home.component';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { AdminReportD1Component } from './admin-report-d1/admin-report-d1.component';
import { AdminReportD2Component } from './admin-report-d2/admin-report-d2.component';
import { AdminReportD3Component } from './admin-report-d3/admin-report-d3.component';
import { AdminReportD4Component } from './admin-report-d4/admin-report-d4.component';
import { AdminReportD5Component } from './admin-report-d5/admin-report-d5.component';
import { AdminReportD6Component } from './admin-report-d6/admin-report-d6.component';
import { AdminReportD7Component } from './admin-report-d7/admin-report-d7.component';
import { AdminReportNscMonitoringComponent } from './admin-report-nsc-monitoring/admin-report-nsc-monitoring.component';
import { AdminReportConsumerComplaintsRedressalComponent } from './admin-report-consumer-complaints-redressal/admin-report-consumer-complaints-redressal.component';
import { AdminReportFeederJsonFileComponent } from './admin-report-feeder-json-file/admin-report-feeder-json-file.component';

const routes: Routes = [
  {
    path: '',
    component: AdminReportComponent,
    children: [
      { 
        path: 'home', component: AdminReportHomeComponent, 
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      {
        path: 'd1',component: AdminReportD1Component,
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      {
        path: 'd2',component: AdminReportD2Component,
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      {
        path: 'd3',component: AdminReportD3Component,
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      {
        path: 'd4',component: AdminReportD4Component,
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      {
        path: 'd5',component: AdminReportD5Component,
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      {
        path: 'd6',component: AdminReportD6Component,
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      {
        path: 'd7',component: AdminReportD7Component,
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      {
        path: 'nsc-monitoring',component: AdminReportNscMonitoringComponent,
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      {
        path: 'consumer-complaints-redressal',component: AdminReportConsumerComplaintsRedressalComponent,
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      {
        path: 'feeder/json',component: AdminReportFeederJsonFileComponent,
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      { 
        path: '', redirectTo: 'home',
        pathMatch: 'full' 
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminReportRoutingModule { }
