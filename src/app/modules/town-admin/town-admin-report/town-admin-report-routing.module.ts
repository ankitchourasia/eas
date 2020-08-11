import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateAuthGuard } from 'app/guards/can-activate.authguard';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { TownAdminReportComponent } from './town-admin-report.component';
import { TownAdminReportHomeComponent } from './town-admin-report-home/town-admin-report-home.component';
import { TownAdminReportD1ReportComponent } from './town-admin-report-d1-report/town-admin-report-d1-report.component';

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
