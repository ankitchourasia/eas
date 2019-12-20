import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminFeeder33KVAddComponent } from './admin-feeder-33kv-add/admin-feeder-33kv-add.component';
import { AdminFeeder33KVReadingAddComponent } from './admin-feeder-33kv-reading-add/admin-feeder-33kv-reading-add.component';
import { Feeder33KVModule } from '@eas-components/feeder-33kv/feeder-33kv.module';
import { AdminFeeder33KVExportPointAddComponent } from './admin-feeder-33kv-export-point-add/admin-feeder-33kv-export-point-add.component';
import { AdminFeeder33KVExportPointReadingAddComponent } from './admin-feeder-33kv-export-point-reading-add/admin-feeder-33kv-export-point-reading-add.component';

@NgModule({
  imports: [
    CommonModule,
    Feeder33KVModule
  ],
  declarations: [AdminFeeder33KVAddComponent, AdminFeeder33KVReadingAddComponent, AdminFeeder33KVExportPointAddComponent, AdminFeeder33KVExportPointReadingAddComponent],
})
export class AdminFeeder33kvModule { }
