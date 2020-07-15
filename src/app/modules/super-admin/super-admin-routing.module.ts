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
            loadChildren: () => import('app/modules/super-admin/super-admin-region/super-admin-region.module').then(m => m.SuperAdminRegionModule)
          },
          {
            path: 'circle',
            loadChildren: () => import('app/modules/super-admin/super-admin-circle/super-admin-circle.module').then(m => m.SuperAdminCircleModule)
          },
          {
            path: 'division',
            loadChildren: () => import('app/modules/super-admin/super-admin-division/super-admin-division.module').then(m => m.SuperAdminDivisionModule)
          },
          {
            path: 'zone',
            loadChildren: () => import('app/modules/super-admin/super-admin-zone/super-admin-zone.module').then(m => m.SuperAdminZoneModule)
          },
          {
            path: 'user',
            loadChildren: () => import('app/modules/super-admin/super-admin-user/super-admin-user.module').then(m => m.SuperAdminUserModule)
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
