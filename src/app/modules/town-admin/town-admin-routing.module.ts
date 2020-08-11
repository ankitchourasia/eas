import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateAuthGuard } from 'app/guards/can-activate.authguard';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { TownAdminComponent } from './town-admin.component';
import { TownAdminHomeComponent } from './town-admin-home/town-admin-home.component';

const routes: Routes = [
  {
    canActivate: [CanActivateAuthGuard],
    data: { expectedRoles: [GlobalConfiguration.ROLE_TOWN_ADMIN] },
    path: '', component: TownAdminComponent,
    children: [
      {
        path: '', children: [
          {
            path: 'home', component: TownAdminHomeComponent
          },
          {
            path: 'report',
            loadChildren: () => import('app/modules/town-admin/town-admin-report/town-admin-report.module').then(m => m.TownAdminReportModule)
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
export class TownAdminRoutingModule { }
