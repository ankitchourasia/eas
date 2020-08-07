import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateAuthGuard } from 'app/guards/can-activate.authguard';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { ReportAdminComponent } from './report-admin.component';
import { ReportAdminHomeComponent } from './report-admin-home/report-admin-home.component';

const routes: Routes = [
  {
    canActivate: [CanActivateAuthGuard],
    data: { expectedRoles: [GlobalConfiguration.ROLE_REPORT_ADMIN] },
    path: '', component: ReportAdminComponent,
    children: [
      {
        path: '', children: [
          {
            path: 'home', component: ReportAdminHomeComponent
          },
          {
            path: 'report',
            loadChildren: () => import('app/modules/report-admin/report-admin-report/report-admin-report.module').then(m => m.ReportAdminReportModule)
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
export class ReportAdminRoutingModule { }
