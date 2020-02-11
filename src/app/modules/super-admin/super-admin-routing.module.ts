import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminComponent } from './super-admin.component';
import { CanActivateAuthGuard } from 'app/guards/can-activate.authguard';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { SuperAdminHomeComponent } from './super-admin-home/super-admin-home.component';

const routes: Routes = [
  {
    canActivate: [CanActivateAuthGuard],
    data: { expectedRoles: [GlobalConfiguration.ROLE_SUPER_ADMIN] },
    path: '', component: SuperAdminComponent,
    children: [
      {
        path: '', children: [
          {
            path: 'home', component: SuperAdminHomeComponent
          },
          {
            path: 'region',
            loadChildren: 'app/modules/super-admin/super-admin-region/super-admin-region.module#SuperAdminRegionModule'
          },
          {
            path: 'circle',
            loadChildren: 'app/modules/super-admin/super-admin-circle/super-admin-circle.module#SuperAdminCircleModule'
          },
          {
            path: 'division',
            loadChildren: 'app/modules/super-admin/super-admin-division/super-admin-division.module#SuperAdminDivisionModule'
          },
          {
            path: 'zone',
            loadChildren: 'app/modules/super-admin/super-admin-zone/super-admin-zone.module#SuperAdminZoneModule'
          },
          {
            path: 'user',
            loadChildren: 'app/modules/super-admin/super-admin-user/super-admin-user.module#SuperAdminUserModule'
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
  imports: [RouterModule.forChild(routes)],
  exports : [RouterModule]
})
export class SuperAdminRoutingModule { }
