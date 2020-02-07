import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminSubstationComponent } from './admin-substation.component';
import { AdminSubstationHomeComponent } from './admin-substation-home/admin-substation-home.component';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { AdminSubstationAddComponent } from './admin-substation-add/admin-substation-add.component';
import { AdminSubstationViewComponent } from './admin-substation-view/admin-substation-view.component';

const routes: Routes = [
  {
    path: '',
    component: AdminSubstationComponent,
    children: [
      { 
        path: 'home', component: AdminSubstationHomeComponent, 
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      {
        path: 'add', component: AdminSubstationAddComponent,
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      {
        path: 'view',component: AdminSubstationViewComponent,
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
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
export class AdminSubstationRoutingModule { }
