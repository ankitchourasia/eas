import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AdminModule } from './modules/admin/admin.module';

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
    path: 'admin',
    // loadChildren: 'app/modules/admin/admin.module#AdminModule'
    loadChildren: () => AdminModule
  },
  { 
    path: '**', 
    redirectTo: '/login',
    pathMatch: 'full' 
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
