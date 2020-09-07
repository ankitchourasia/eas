import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateAuthGuard } from 'app/guards/can-activate.authguard';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { ReportAdminReportComponent } from './report-admin-report.component';
import { ReportAdminReportHomeComponent } from './report-admin-report-home/report-admin-report-home.component';
import { ReportAdminReportD1ReportComponent } from './report-admin-report-d1-report/report-admin-report-d1-report.component';
import { ReportAdminReportD7ReportComponent } from './report-admin-report-d7-report/report-admin-report-d7-report.component';

const routes: Routes = [
  {
    canActivate: [CanActivateAuthGuard],
    data: { expectedRoles: [GlobalConfiguration.ROLE_REPORT_ADMIN] },
    path: '', component: ReportAdminReportComponent,
    children: [
      {
        path: '', children: [
          {
            path: 'home', component: ReportAdminReportHomeComponent
          },
          {
            path: 'd1-report', component: ReportAdminReportD1ReportComponent,
          },
          {
            path: 'd7-report', component: ReportAdminReportD7ReportComponent,
          },
          {
            path: '', redirectTo: 'home', pathMatch: 'full'
          }
        ]
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports : [RouterModule]
})
export class ReportAdminReportRoutingModule { }
