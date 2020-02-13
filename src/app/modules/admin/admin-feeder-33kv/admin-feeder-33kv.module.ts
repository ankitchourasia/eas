import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminFeeder33KVAddComponent } from './admin-feeder-33kv-add/admin-feeder-33kv-add.component';
import { AdminFeeder33KVReadingAddComponent } from './admin-feeder-33kv-reading-add/admin-feeder-33kv-reading-add.component';
import { Feeder33KVModule } from '@eas-components/feeder-33kv/feeder-33kv.module';
import { AdminFeeder33KVExportPointAddComponent } from './admin-feeder-33kv-export-point-add/admin-feeder-33kv-export-point-add.component';
import { AdminFeeder33KVExportPointReadingAddComponent } from './admin-feeder-33kv-export-point-reading-add/admin-feeder-33kv-export-point-reading-add.component';
import { AdminFeeder33KVImportPointAddComponent } from './admin-feeder-33kv-import-point-add/admin-feeder-33kv-import-point-add.component';
import { AdminFeeder33KVImportPointReadingAddComponent } from './admin-feeder-33kv-import-point-reading-add/admin-feeder-33kv-import-point-reading-add.component';
import { AdminFeeder33KVHomeComponent } from './admin-feeder-33kv-home/admin-feeder-33kv-home.component';
import { AdminFeeder33KVComponent } from './admin-feeder-33kv.component';
import { AdminFeeder33KVMenuService } from './admin-feeder-33kv-menu.service';
import { AdminFeeder33KVRoutingModule } from './admin-feeder-33kv-routing.module';

@NgModule({
  imports: [
    CommonModule,
    Feeder33KVModule,
    AdminFeeder33KVRoutingModule
  ],
  declarations: [
    AdminFeeder33KVComponent,
    AdminFeeder33KVHomeComponent,
    AdminFeeder33KVAddComponent, 
    AdminFeeder33KVReadingAddComponent, 
    AdminFeeder33KVExportPointAddComponent, 
    AdminFeeder33KVExportPointReadingAddComponent,
    AdminFeeder33KVImportPointAddComponent, 
    AdminFeeder33KVImportPointReadingAddComponent
  ],
  providers: [
    AdminFeeder33KVMenuService
  ]
})
export class AdminFeeder33KVModule { }
