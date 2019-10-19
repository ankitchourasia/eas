import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminComponent } from './super-admin.component';
import { CanActivateAuthGuard } from 'app/guards/can-activate.authguard';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { SuperAdminHomeComponent } from './super-admin-home/super-admin-home.component';
import { SuperAdminRegionAddComponent } from './super-admin-region/super-admin-region-add/super-admin-region-add.component';
import { SuperAdminRegionViewComponent } from './super-admin-region/super-admin-region-view/super-admin-region-view.component';
import { SuperAdminCircleAddComponent } from './super-admin-circle/super-admin-circle-add/super-admin-circle-add.component';
import { SuperAdminCircleViewComponent } from './super-admin-circle/super-admin-circle-view/super-admin-circle-view.component';
import { SuperAdminDivisionAddComponent } from './super-admin-division/super-admin-division-add/super-admin-division-add.component';
import { SuperAdminDivisionViewComponent } from './super-admin-division/super-admin-division-view/super-admin-division-view.component';
import { SuperAdminZoneAddComponent } from './super-admin-zone/super-admin-zone-add/super-admin-zone-add.component';
import { SuperAdminZoneViewComponent } from './super-admin-zone/super-admin-zone-view/super-admin-zone-view.component';
import { SuperAdminUserAddComponent } from './super-admin-user/super-admin-user-add/super-admin-user-add.component';


const superAdminRoutes: Routes = [
  {
    path: '', 
    component: SuperAdminComponent,
    canActivate: [CanActivateAuthGuard],
    data: {
      expectedRoles: [GlobalConfiguration.ROLE_SUPER_ADMIN]
    },
    children: [
      {
        path: '',
        canActivateChild: [CanActivateAuthGuard],
        children: [
          {
            path: 'home', component: SuperAdminHomeComponent
          },
          {
            path: 'region/add', component: SuperAdminRegionAddComponent
          },
          {
            path: 'region/view',component: SuperAdminRegionViewComponent
          },
          {
            path: 'circle/add', component: SuperAdminCircleAddComponent
          },
          {
            path: 'circle/view',component: SuperAdminCircleViewComponent
          },
          {
            path: 'division/add', component: SuperAdminDivisionAddComponent
          },
          {
            path: 'division/view',component: SuperAdminDivisionViewComponent
          },
          {
            path: 'zone/add', component: SuperAdminZoneAddComponent
          },
          {
            path: 'zone/view',component: SuperAdminZoneViewComponent
          },
          {
            path: 'user/add',component: SuperAdminUserAddComponent
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
    RouterModule.forChild(superAdminRoutes)
  ],
  exports : [RouterModule]
})
export class SuperAdminRoutingModule { }
