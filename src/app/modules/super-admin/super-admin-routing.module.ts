import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminComponent } from './super-admin.component';
import { CanActivateAuthGuard } from 'app/guards/can-activate.authguard';
import { GlobalConfiguration } from 'app/utility/global-configuration';
import { SuperAdminHomeComponent } from './super-admin-home/super-admin-home.component';
import { SuperAdminRegionAddComponent } from './super-admin-region/super-admin-region-add/super-admin-region-add.component';
import { SuperAdminRegionViewComponent } from './super-admin-region/super-admin-region-view/super-admin-region-view.component';


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
          // {
          //   path: 'circle/add', component: SuperAdminCircleAddComponent
          // },
          // {
          //   path: 'circle/view',component: SuperAdminCircleViewComponent
          // },
          // {
          //   path: 'division/add', component: SuperAdminDivisionAddComponent
          // },
          // {
          //   path: 'division/view',component: SuperAdminDivisionViewComponent
          // },
          // {
          //   path: 'zone/add', component: SuperAdminZoneAddComponent
          // },
          // {
          //   path: 'zone/view',component: SuperAdminZoneViewComponent
          // },
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
