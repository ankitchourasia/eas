import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperAdminZoneComponent } from './super-admin-zone.component';
import { SuperAdminZoneHomeComponent } from './super-admin-zone-home/super-admin-zone-home.component';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { SuperAdminZoneAddComponent } from './super-admin-zone-add/super-admin-zone-add.component';
import { SuperAdminZoneViewComponent } from './super-admin-zone-view/super-admin-zone-view.component';

const routes: Routes = [
  {
    data: { expectedRoles: [GlobalConfiguration.ROLE_SUPER_ADMIN] },
    path: '', component: SuperAdminZoneComponent,
    children: [
      { 
        path: 'home', component: SuperAdminZoneHomeComponent, 
      },
      {
        path: 'add', component: SuperAdminZoneAddComponent,
      },
      {
        path: 'view',component: SuperAdminZoneViewComponent,
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
export class SuperAdminZoneRoutingModule { }
