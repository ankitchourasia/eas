import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperAdminRegionComponent } from './super-admin-region.component';
import { SuperAdminRegionHomeComponent } from './super-admin-region-home/super-admin-region-home.component';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { SuperAdminRegionAddComponent } from './super-admin-region-add/super-admin-region-add.component';
import { SuperAdminRegionViewComponent } from './super-admin-region-view/super-admin-region-view.component';

const routes: Routes = [
  {
    data: { expectedRoles: [GlobalConfiguration.ROLE_SUPER_ADMIN] },
    path: '', component: SuperAdminRegionComponent,
    children: [
      { 
        path: 'home', component: SuperAdminRegionHomeComponent, 
      },
      {
        path: 'add', component: SuperAdminRegionAddComponent,
      },
      {
        path: 'view',component: SuperAdminRegionViewComponent,
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
export class SuperAdminRegionRoutingModule { }
