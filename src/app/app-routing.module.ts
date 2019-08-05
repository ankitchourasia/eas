import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';

const routes: Routes = [
  { 
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { 
    path: 'login',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'super_admin',
    loadChildren: 'app/modules/super-admin/super-admin.module#SuperAdminModule'
  },
  {
    path: 'admin',
    loadChildren: 'app/modules/admin/admin.module#AdminModule'
  },
  {
    path: 'setting',
    loadChildren: 'app/modules/setting/setting.module#SettingModule'
  },
  { 
    path: '**', 
    redirectTo: '/login',
    pathMatch: 'full' 
  }
];
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

export const appRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
