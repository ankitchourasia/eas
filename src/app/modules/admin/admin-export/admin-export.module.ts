import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminExportPointViewComponent } from './admin-export-point-view/admin-export-point-view.component';
import { AdminExportPointReadingViewComponent } from './admin-export-point-reading-view/admin-export-point-reading-view.component';
import { AdminExportPointAddComponent } from './admin-export-point-add/admin-export-point-add.component';
import { ExportComponentModule } from '@eas-components/export/export-component.module';

@NgModule({
  imports: [
    CommonModule,
    ExportComponentModule
  ],
  declarations: [AdminExportPointViewComponent, AdminExportPointReadingViewComponent, AdminExportPointAddComponent],
})
export class AdminExportModule { }
