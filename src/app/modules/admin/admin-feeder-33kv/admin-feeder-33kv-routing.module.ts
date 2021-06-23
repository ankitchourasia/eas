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
import { AdminFeeder33KVViewComponent } from './admin-feeder-33kv-view/admin-feeder-33kv-view.component';
import { AdminFeeder33KVReadViewComponent } from './admin-feeder-33kv-read-view/admin-feeder-33kv-read-view.component';
import { AdminFeeder33KVExportPointViewComponent } from './admin-feeder-33kv-export-point-view/admin-feeder-33kv-export-point-view.component';
import { AdminFeeder33KVExportPointReadViewComponent } from './admin-feeder-33kv-export-point-read-view/admin-feeder-33kv-export-point-read-view.component';
import { AdminFeeder33KVAbsentReadComponent } from './admin-feeder-33kv-absent-read/admin-feeder-33kv-absent-read.component';
import { AdminFeeder33KVExportPointAbsentReadComponent } from './admin-feeder-33kv-export-point-absent-read/admin-feeder-33kv-export-point-absent-read.component';
import { AdminFeeder33KVInitialReadAddComponent } from './admin-feeder-33kv-initial-read-add/admin-feeder-33kv-initial-read-add.component';

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
        path: 'view',component: AdminFeeder33KVViewComponent,
      },
      {
        path: 'read/add',component: AdminFeeder33KVReadingAddComponent,
      },
      {
        path: 'read/view',component: AdminFeeder33KVReadViewComponent,
      },
      {
        path: 'import-point/add',component: AdminFeeder33KVImportPointAddComponent,
      },
      {
        path: 'import-point/read/add',component: AdminFeeder33KVImportPointReadingAddComponent,
      },
      {
        path: 'export-point/add',component: AdminFeeder33KVExportPointAddComponent,
      },
      {
        path: 'export-point/view',component: AdminFeeder33KVExportPointViewComponent,
      },
      {
        path: 'export-point/read/add',component: AdminFeeder33KVExportPointReadingAddComponent,
      },
      {
        path: 'export-point/read/view',component: AdminFeeder33KVExportPointReadViewComponent,
      },
      {
        path: 'absent-read',component: AdminFeeder33KVAbsentReadComponent,
      },
      {
        path: 'export-absent-read',component: AdminFeeder33KVExportPointAbsentReadComponent,
      },
      {
        path: 'initial-read/add',component: AdminFeeder33KVInitialReadAddComponent
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
