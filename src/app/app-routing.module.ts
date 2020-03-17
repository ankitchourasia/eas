import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

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
@NgModule({
  imports: [RouterModule.forRoot(routes)],//LAZY LOADING
  // imports: [RouterModule.forRoot(routes ,{ preloadingStrategy: PreloadAllModules } )], //PRELOADING LOAD IN BACKGROUND
  exports: [RouterModule]
})
export class AppRoutingModule { }
//-----------------------------------OR-------------------------------------
// export const appRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
// export const appRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes ,{ preloadingStrategy: PreloadAllModules } );
