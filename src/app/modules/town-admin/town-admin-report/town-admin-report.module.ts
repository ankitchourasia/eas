import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TownAdminReportComponent } from './town-admin-report.component';
import { TownAdminReportHomeComponent } from './town-admin-report-home/town-admin-report-home.component';
import { TownAdminReportRoutingModule } from './town-admin-report-routing.module';
import { TownAdminReportMenuService } from './town-admin-report-menu.service';
import { TownAdminReportD1ReportComponent } from './town-admin-report-d1-report/town-admin-report-d1-report.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TownAdminReportRoutingModule
  ],
  declarations: [
    TownAdminReportComponent,
    TownAdminReportD1ReportComponent,
    TownAdminReportHomeComponent
  ],
  providers: [
    TownAdminReportMenuService
  ]
})
export class TownAdminReportModule { }
