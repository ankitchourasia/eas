import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateAuthGuard } from 'app/guards/can-activate.authguard';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { TownAdminReportComponent } from './town-admin-report.component';
import { TownAdminReportHomeComponent } from './town-admin-report-home/town-admin-report-home.component';
import { TownAdminReportD1ReportComponent } from './town-admin-report-d1-report/town-admin-report-d1-report.component';
import { TownAdminReportD4ReportComponent } from './town-admin-report-d4-report/town-admin-report-d4-report.component';
import { TownAdminReportD7ReportComponent } from './town-admin-report-d7-report/town-admin-report-d7-report.component';
import { TownAdminReportTownWiseBillingDataComponent } from './town-admin-report-town-wise-billing-data/town-admin-report-town-wise-billing-data.component';
import { TownAdminReportTownWiseFeederDataComponent } from './town-admin-report-town-wise-feeder-data/town-admin-report-town-wise-feeder-data.component';

const routes: Routes = [
  {
    canActivate: [CanActivateAuthGuard],
    data: { expectedRoles: [GlobalConfiguration.ROLE_TOWN_ADMIN] },
    path: '', component: TownAdminReportComponent,
    children: [
      {
        path: '', children: [
          {
            path: 'home', component: TownAdminReportHomeComponent
          },
          {
            path: 'd1-report', component: TownAdminReportD1ReportComponent,
          },
          {
            path: 'd4-report', component: TownAdminReportD4ReportComponent,
          },
          {
            path: 'd7-report', component: TownAdminReportD7ReportComponent,
          },
          {
            path: 'town-billing-data', component: TownAdminReportTownWiseBillingDataComponent,
          },
          {
            path: 'feeder-billing-data', component: TownAdminReportTownWiseFeederDataComponent,
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
export class TownAdminReportRoutingModule { }
