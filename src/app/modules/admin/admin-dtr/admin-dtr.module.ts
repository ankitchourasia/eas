import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDtrAddComponent } from './admin-dtr-add/admin-dtr-add.component';
import { AdminDtrViewComponent } from './admin-dtr-view/admin-dtr-view.component';
import { AdminDtrAddInitialReadComponent } from './admin-dtr-add-initial-read/admin-dtr-add-initial-read.component';
import { AdminDtrReadViewComponent } from './admin-dtr-read-view/admin-dtr-read-view.component';
import { AdminDtrLossReportComponent } from './admin-dtr-loss-report/admin-dtr-loss-report.component';
import { AdminDtrReadAddComponent } from './admin-dtr-read-add/admin-dtr-read-add.component';
import { DtrComponentModule } from '@eas-components/dtr/dtr-component.module';
import { AdminDtrPreBillingComponent } from './admin-dtr-pre-billing/admin-dtr-pre-billing.component';
import { AdminDtrHomeComponent } from './admin-dtr-home/admin-dtr-home.component';
import { AdminDtrComponent } from './admin-dtr.component';
import { AdminDtrMenuService } from './admin-dtr-menu.service';
import { AdminDtrRoutingModule } from './admin-dtr-routing.module';


@NgModule({
  imports: [
    CommonModule,
    DtrComponentModule,
    AdminDtrRoutingModule
  ],
  declarations: [
    AdminDtrAddComponent,
    AdminDtrViewComponent,
    AdminDtrAddInitialReadComponent,
    AdminDtrReadViewComponent,
    AdminDtrLossReportComponent,
    AdminDtrReadAddComponent,
    AdminDtrPreBillingComponent,
    AdminDtrHomeComponent,
    AdminDtrComponent
  ],
  providers: [
    AdminDtrMenuService
  ]
})
export class AdminDtrModule { }
