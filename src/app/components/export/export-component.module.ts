import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportPointViewComponent } from './export-point-view/export-point-view.component';
import { ExportPointReadingViewComponent } from './export-point-reading-view/export-point-reading-view.component';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from '@eas-directives/directive.module';
import { ExportPointAddComponent } from './export-point-add/export-point-add.component';
import { ExportPointReadingAddComponent } from './export-point-reading-add/export-point-reading-add.component';
import { Export11KVAbsentReadComponent } from './export-11kv-absent-read/export-11kv-absent-read.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule,
  ],
  declarations: [
    ExportPointViewComponent, 
    ExportPointReadingViewComponent, 
    ExportPointAddComponent, 
    ExportPointReadingAddComponent, 
    Export11KVAbsentReadComponent
  ],
  exports: [
    ExportPointViewComponent, 
    ExportPointReadingViewComponent, 
    ExportPointAddComponent, 
    ExportPointReadingAddComponent,
    Export11KVAbsentReadComponent
  ],
})
export class ExportComponentModule { }
