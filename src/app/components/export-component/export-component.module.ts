import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportPointViewComponent } from './export-point-view/export-point-view.component';
import { ExportPointReadingViewComponent } from './export-point-reading-view/export-point-reading-view.component';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from '@eas-directives/directive.module';
import { PaginationServiceModule } from '@eas-services/pagination/pagination-service.module';
import { ExportPointAddComponent } from './export-point-add/export-point-add.component';
import { ExportPointReadingAddComponent } from './export-point-reading-add/export-point-reading-add.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule,
    PaginationServiceModule
  ],
  declarations: [ExportPointViewComponent, ExportPointReadingViewComponent, ExportPointAddComponent, ExportPointReadingAddComponent],
  exports: [ExportPointViewComponent, ExportPointReadingViewComponent, ExportPointAddComponent, ExportPointReadingAddComponent],
})
export class ExportComponentModule { }
