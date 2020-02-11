import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperAdminCircleComponent } from './super-admin-circle.component';
import { SuperAdminCircleHomeComponent } from './super-admin-circle-home/super-admin-circle-home.component';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { SuperAdminCircleAddComponent } from './super-admin-circle-add/super-admin-circle-add.component';
import { SuperAdminCircleViewComponent } from './super-admin-circle-view/super-admin-circle-view.component';

const routes: Routes = [
  {
    data: { expectedRoles: [GlobalConfiguration.ROLE_SUPER_ADMIN] },
    path: '',component: SuperAdminCircleComponent,
    children: [
      { 
        path: 'home', component: SuperAdminCircleHomeComponent, 
      },
      {
        path: 'add', component: SuperAdminCircleAddComponent,
      },
      {
        path: 'view',component: SuperAdminCircleViewComponent,
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
export class SuperAdminCircleRoutingModule { }
