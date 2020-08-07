import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportAdminHomeComponent } from './report-admin-home/report-admin-home.component';
import { ReportAdminMenuService } from './report-admin-menu.service';
import { ReportAdminRoutingModule } from './report-admin-routing.module';
import { HeaderComponentModule } from '@eas-components/header/header-component.module';
import { ReportAdminComponent } from './report-admin.component';



@NgModule({
  imports: [
    CommonModule,
    HeaderComponentModule,
    ReportAdminRoutingModule
  ],
  declarations: [
    ReportAdminComponent,
    ReportAdminHomeComponent
  ],
  providers: [
    ReportAdminMenuService
  ]
})
export class ReportAdminModule { }
