import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminFeeder33KVComponent } from './admin-feeder-33kv.component';
import { AdminFeeder33KVHomeComponent } from './admin-feeder-33kv-home/admin-feeder-33kv-home.component';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { AdminFeeder33KVAddComponent } from './admin-feeder-33kv-add/admin-feeder-33kv-add.component';
import { AdminFeeder33KVReadingAddComponent } from './admin-feeder-33kv-reading-add/admin-feeder-33kv-reading-add.component';
import { AdminFeeder33KVImportPointAddComponent } from './admin-feeder-33kv-import-point-add/admin-feeder-33kv-import-point-add.component';
import { AdminFeeder33KVImportPointReadingAddComponent } from './admin-feeder-33kv-import-point-reading-add/admin-feeder-33kv-import-point-reading-add.component';
import { AdminFeeder33KVExportPointAddComponent } from './admin-feeder-33kv-export-point-add/admin-feeder-33kv-export-point-add.component';
import { AdminFeeder33KVExportPointReadingAddComponent } from './admin-feeder-33kv-export-point-reading-add/admin-feeder-33kv-export-point-reading-add.component';

const routes: Routes = [
  {
    data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } ,
    path: '', component: AdminFeeder33KVComponent,
    children: [
      { 
        path: 'home', component: AdminFeeder33KVHomeComponent, 
      },
      {
        path: 'add',component: AdminFeeder33KVAddComponent,
      },
      {
        path: 'reading/add',component: AdminFeeder33KVReadingAddComponent,
      },
      {
        path: 'import-point/add',component: AdminFeeder33KVImportPointAddComponent,
      },
      {
        path: 'import-point/reading/add',component: AdminFeeder33KVImportPointReadingAddComponent,
      },
      {
        path: 'export-point/add',component: AdminFeeder33KVExportPointAddComponent,
      },
      {
        path: 'export-point/reading/add',component: AdminFeeder33KVExportPointReadingAddComponent,
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

export class AdminFeeder33KVRoutingModule { }
