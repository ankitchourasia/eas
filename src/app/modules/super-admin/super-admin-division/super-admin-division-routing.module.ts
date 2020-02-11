import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperAdminDivisionComponent } from './super-admin-division.component';
import { SuperAdminDivisionHomeComponent } from './super-admin-division-home/super-admin-division-home.component';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { SuperAdminDivisionAddComponent } from './super-admin-division-add/super-admin-division-add.component';
import { SuperAdminDivisionViewComponent } from './super-admin-division-view/super-admin-division-view.component';

const routes: Routes = [
  {
    data: { expectedRoles: [GlobalConfiguration.ROLE_SUPER_ADMIN] },
    path: '', component: SuperAdminDivisionComponent,
    children: [
      { 
        path: 'home', component: SuperAdminDivisionHomeComponent, 
      },
      {
        path: 'add', component: SuperAdminDivisionAddComponent,
      },
      {
        path: 'view',component: SuperAdminDivisionViewComponent,
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
export class SuperAdminDivisionRoutingModule { }
