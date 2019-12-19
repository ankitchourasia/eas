import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminFeeder33KVAddComponent } from './admin-feeder-33kv-add/admin-feeder-33kv-add.component';
import { AdminFeeder33KVReadingAddComponent } from './admin-feeder-33kv-reading-add/admin-feeder-33kv-reading-add.component';
import { Feeder33KVModule } from '@eas-components/feeder-33kv/feeder-33kv.module';

@NgModule({
  declarations: [AdminFeeder33KVAddComponent, AdminFeeder33KVReadingAddComponent],
  imports: [
    CommonModule,
    Feeder33KVModule
  ],
})
export class AdminFeeder33kvModule { }
