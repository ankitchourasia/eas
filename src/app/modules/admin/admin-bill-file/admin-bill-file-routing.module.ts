import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminBillFileComponent } from './admin-bill-file.component';
import { AdminBillFileHomeComponent } from './admin-bill-file-home/admin-bill-file-home.component';
import { AdminBillFileUploadComponent } from './admin-bill-file-upload/admin-bill-file-upload.component';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

const routes: Routes = [
  {
    data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } ,
    path: '', component: AdminBillFileComponent,
    children: [
      { 
        path: 'home', component: AdminBillFileHomeComponent, 
      },
      { 
        path: 'upload', component: AdminBillFileUploadComponent,
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
export class AdminBillFileRoutingModule { }
