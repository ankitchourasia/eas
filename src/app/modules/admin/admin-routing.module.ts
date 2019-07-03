import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

const adminRoutes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: 'home', 
            component: AdminHomeComponent
          },
          // {
          //   path: 'dashboard',
          //   loadChildren: 'app/modules/oic/oic-dashboard/oic-dashboard.module#OicDashboardModule'
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
    RouterModule.forChild(adminRoutes)
  ],
  exports : [RouterModule]
})
export class AdminRoutingModule { }
