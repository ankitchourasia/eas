import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDtrComponent } from './admin-dtr.component';
import { AdminDtrHomeComponent } from './admin-dtr-home/admin-dtr-home.component';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { AdminDtrAddComponent } from './admin-dtr-add/admin-dtr-add.component';
import { AdminDtrViewComponent } from './admin-dtr-view/admin-dtr-view.component';
import { AdminDtrAddInitialReadComponent } from './admin-dtr-add-initial-read/admin-dtr-add-initial-read.component';
import { AdminDtrReadAddComponent } from './admin-dtr-read-add/admin-dtr-read-add.component';
import { AdminDtrReadViewComponent } from './admin-dtr-read-view/admin-dtr-read-view.component';
import { AdminDtrLossReportComponent } from './admin-dtr-loss-report/admin-dtr-loss-report.component';
import { AdminDtrPreBillingComponent } from './admin-dtr-pre-billing/admin-dtr-pre-billing.component';

const routes: Routes = [
  {
    data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } ,
    path: '', component: AdminDtrComponent,
    children: [
      { 
        path: 'home', component: AdminDtrHomeComponent, 
      },
      {
        path: 'add', component: AdminDtrAddComponent,
      },
      {
        path: 'view',component: AdminDtrViewComponent,
      },
      {
        path: 'read/add/initial-read',component: AdminDtrAddInitialReadComponent,
      },
      {
        path: 'read/add',component: AdminDtrReadAddComponent,
      },
      {
        path: 'read/view',component: AdminDtrReadViewComponent,
      },
      {
        path: 'generate/loss/report',component: AdminDtrLossReportComponent,
      },
      {
        path: 'pre-billing',component: AdminDtrPreBillingComponent,
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
export class AdminDtrRoutingModule { }
