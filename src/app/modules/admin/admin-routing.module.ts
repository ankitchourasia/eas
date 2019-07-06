import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminSubstationAddComponent } from './admin-substation-add/admin-substation-add.component';
import { AdminSubstationViewComponent } from './admin-substation-view/admin-substation-view.component';
import { AdminFeederAddComponent } from './admin-feeder-add/admin-feeder-add.component';
import { AdminFeederViewComponent } from './admin-feeder-view/admin-feeder-view.component';

const adminRoutes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: 'home', component: AdminHomeComponent
          },
          {
            path: 'substation/add', component: AdminSubstationAddComponent
          },
          {
            path: 'substation/view',component: AdminSubstationViewComponent
          },
          {
            path: 'feeder/add', component: AdminFeederAddComponent
          },
          {
            path: 'feeder/view',component: AdminFeederViewComponent
          },
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
