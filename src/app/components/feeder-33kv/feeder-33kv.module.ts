import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Feeder33KVAddComponent } from './feeder-33kv-add/feeder-33kv-add.component';
import { Feeder33KVReadingAddComponent } from './feeder-33kv-reading-add/feeder-33kv-reading-add.component';
import { Feeder33KVExportPointAddComponent } from './feeder-33kv-export-point-add/feeder-33kv-export-point-add.component';
import { Feeder33KVExportPointReadingAddComponent } from './feeder-33kv-export-point-reading-add/feeder-33kv-export-point-reading-add.component';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from '@eas-directives/directive.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule,
  ],
  declarations: [Feeder33KVAddComponent, Feeder33KVReadingAddComponent, Feeder33KVExportPointAddComponent, Feeder33KVExportPointReadingAddComponent],
  exports: [Feeder33KVAddComponent, Feeder33KVReadingAddComponent, Feeder33KVExportPointAddComponent, Feeder33KVExportPointReadingAddComponent],
})
export class Feeder33KVModule { }
