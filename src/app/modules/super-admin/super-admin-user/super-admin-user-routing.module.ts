import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperAdminUserComponent } from './super-admin-user.component';
import { SuperAdminUserHomeComponent } from './super-admin-user-home/super-admin-user-home.component';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { SuperAdminUserAddComponent } from './super-admin-user-add/super-admin-user-add.component';

const routes: Routes = [
  {
    data: { expectedRoles: [GlobalConfiguration.ROLE_SUPER_ADMIN] },
    path: '', component: SuperAdminUserComponent,
    children: [
      { 
        path: 'home', component: SuperAdminUserHomeComponent, 
      },
      {
        path: 'add', component: SuperAdminUserAddComponent,
      },
      // {
      //   path: 'view',component: SuperAdminUserViewComponent,
      // },
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
export class SuperAdminUserRoutingModule { }