import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from '@eas-directives/directive.module';
import { Feeder33KVAddComponent } from './feeder-33kv-add/feeder-33kv-add.component';
import { Feeder33KVReadingAddComponent } from './feeder-33kv-reading-add/feeder-33kv-reading-add.component';
import { Feeder33KVExportPointAddComponent } from './feeder-33kv-export-point-add/feeder-33kv-export-point-add.component';
import { Feeder33KVExportPointReadingAddComponent } from './feeder-33kv-export-point-reading-add/feeder-33kv-export-point-reading-add.component';
import { Feeder33KVImportPointReadingAddComponent } from './feeder-33kv-import-point-reading-add/feeder-33kv-import-point-reading-add.component';
import { Feeder33KVImportPointAddComponent } from './feeder-33kv-import-point-add/feeder-33kv-import-point-add.component';
import { Feeder33KVViewComponent } from './feeder-33kv-view/feeder-33kv-view.component';
import { Feeder33KVExportPointViewComponent } from './feeder-33kv-export-point-view/feeder-33kv-export-point-view.component';
import { Feeder33KVExportPointReadViewComponent } from './feeder-33kv-export-point-read-view/feeder-33kv-export-point-read-view.component';
import { Feeder33KVReadViewComponent } from './feeder-33kv-read-view/feeder-33kv-read-view.component';
import { Feeder33KVAbsentReadComponent } from './feeder-33kv-absent-read/feeder-33kv-absent-read.component';
import { Feeder33KVExportPointAbsentReadComponent } from './feeder-33kv-export-point-absent-read/feeder-33kv-export-point-absent-read.component';
import { Feeder33KVInitialReadAddComponent } from './feeder-33kv-initial-read-add/feeder-33kv-initial-read-add.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule,
  ],
  declarations: [
    Feeder33KVAddComponent, 
    Feeder33KVReadingAddComponent, 
    Feeder33KVExportPointAddComponent, 
    Feeder33KVExportPointReadingAddComponent, 
    Feeder33KVImportPointAddComponent, 
    Feeder33KVImportPointReadingAddComponent, 
    Feeder33KVViewComponent, 
    Feeder33KVExportPointViewComponent, 
    Feeder33KVExportPointReadViewComponent, 
    Feeder33KVReadViewComponent, 
    Feeder33KVAbsentReadComponent, 
    Feeder33KVExportPointAbsentReadComponent,
    Feeder33KVInitialReadAddComponent
  ],
  exports: [
    Feeder33KVAddComponent, 
    Feeder33KVReadingAddComponent, 
    Feeder33KVExportPointAddComponent, 
    Feeder33KVExportPointReadingAddComponent, 
    Feeder33KVImportPointAddComponent, 
    Feeder33KVImportPointReadingAddComponent,
    Feeder33KVViewComponent, 
    Feeder33KVExportPointViewComponent, 
    Feeder33KVExportPointReadViewComponent, 
    Feeder33KVReadViewComponent,
    Feeder33KVAbsentReadComponent,
    Feeder33KVExportPointAbsentReadComponent,
    Feeder33KVInitialReadAddComponent
  ],
})
export class Feeder33KVModule { }
