import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { AdminFeeder11KVComponent } from './admin-feeder-11kv.component';
import { AdminFeeder11KVHomeComponent } from './admin-feeder-11kv-home/admin-feeder-11kv-home.component';
import { AdminFeeder11KVAddComponent } from './admin-feeder-11kv-add/admin-feeder-11kv-add.component';
import { AdminFeeder11KVViewComponent } from './admin-feeder-11kv-view/admin-feeder-11kv-view.component';
import { AdminFeeder11KVInitialReadAddComponent } from './admin-feeder-11kv-initial-read-add/admin-feeder-11kv-initial-read-add.component';
import { AdminFeeder11KVMappingAddComponent } from './admin-feeder-11kv-mapping-add/admin-feeder-11kv-mapping-add.component';
import { AdminFeeder11KVReadAddComponent } from './admin-feeder-11kv-read-add/admin-feeder-11kv-read-add.component';
import { AdminFeeder11KVReadViewComponent } from './admin-feeder-11kv-read-view/admin-feeder-11kv-read-view.component';
import { AdminFeeder11KVAbsentReadViewComponent } from './admin-feeder-11kv-absent-read-view/admin-feeder-11kv-absent-read-view.component';
import { AdminFeeder11KVTndLossReportComponent } from './admin-feeder-11kv-tnd-loss-report/admin-feeder-11kv-tnd-loss-report.component';
import { AdminFeeder11KVTndLossReportWithoutHtComponent } from './admin-feeder-11kv-tnd-loss-report-without-ht/admin-feeder-11kv-tnd-loss-report-without-ht.component';
import { AdminFeeder11KVAtncLossReportComponent } from './admin-feeder-11kv-atnc-loss-report/admin-feeder-11kv-atnc-loss-report.component';
import { AdminFeeder11KVInterruptionAddComponent } from './admin-feeder-11kv-interruption-add/admin-feeder-11kv-interruption-add.component';
import { AdminFeeder11KVExportPointAddComponent } from './admin-feeder-11kv-export-point-add/admin-feeder-11kv-export-point-add.component';
import { AdminFeeder11KVExportPointViewComponent } from './admin-feeder-11kv-export-point-view/admin-feeder-11kv-export-point-view.component';
import { AdminFeeder11KVExportPointReadAddComponent } from './admin-feeder-11kv-export-point-read-add/admin-feeder-11kv-export-point-read-add.component';
import { AdminFeeder11KVExportPointReadViewComponent } from './admin-feeder-11kv-export-point-read-view/admin-feeder-11kv-export-point-read-view.component';

const routes: Routes = [
  {
    path: '',
    component: AdminFeeder11KVComponent,
    children: [
      { 
        path: 'home', component: AdminFeeder11KVHomeComponent, 
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      {
        path: 'add', component: AdminFeeder11KVAddComponent,
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      {
        path: 'view',component: AdminFeeder11KVViewComponent,
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      {
        path: 'read/add/initial', component: AdminFeeder11KVInitialReadAddComponent,
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      {
        path: 'mapping/add', component: AdminFeeder11KVMappingAddComponent,
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      {
        path: 'read/add', component: AdminFeeder11KVReadAddComponent,
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      {
        path: 'read/view',component: AdminFeeder11KVReadViewComponent,
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      {
        path: 'read/view/absent',component: AdminFeeder11KVAbsentReadViewComponent,
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      {
        path: 'report/tnd-loss',component: AdminFeeder11KVTndLossReportComponent,
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      {
        path: 'report/tnd-loss/without-ht',component: AdminFeeder11KVTndLossReportWithoutHtComponent,
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      {
        path: 'report/atnc-loss',component: AdminFeeder11KVAtncLossReportComponent,
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      {
        path: 'interruption/add',component: AdminFeeder11KVInterruptionAddComponent,
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      {
        path: 'export-point/add',component: AdminFeeder11KVExportPointAddComponent,
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      {
        path: 'export-point/view',component: AdminFeeder11KVExportPointViewComponent,
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      {
        path: 'export-point/read/add',component: AdminFeeder11KVExportPointReadAddComponent,
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
      },
      {
        path: 'export-point/read/view',component: AdminFeeder11KVExportPointReadViewComponent,
        data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } 
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

export class AdminFeeder11KVRoutingModule { }
