import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CanActivateAuthGuard } from 'app/guards/can-activate.authguard';
import { GlobalConfiguration } from 'app/utility/global-configuration';
import { AdminSubstationAddComponent } from './admin-substation/admin-substation-add/admin-substation-add.component';
import { AdminSubstationViewComponent } from './admin-substation/admin-substation-view/admin-substation-view.component';
import { AdminFeederAddComponent } from './admin-feeder/admin-feeder-add/admin-feeder-add.component';
import { AdminFeederViewComponent } from './admin-feeder/admin-feeder-view/admin-feeder-view.component';
import { AdminFeederReadingAddComponent } from './admin-feeder/admin-feeder-reading-add/admin-feeder-reading-add.component';
import { AdminFeederReadingViewComponent } from './admin-feeder/admin-feeder-reading-view/admin-feeder-reading-view.component';
import { AdminFeederAbsentReadingViewComponent } from './admin-feeder/admin-feeder-absent-reading-view/admin-feeder-absent-reading-view.component';
import { AdminDtrAddComponent } from './admin-dtr/admin-dtr-add/admin-dtr-add.component';
import { AdminDtrViewComponent } from './admin-dtr/admin-dtr-view/admin-dtr-view.component';
import { AdminDtrAddInitialReadComponent } from './admin-dtr/admin-dtr-add-initial-read/admin-dtr-add-initial-read.component';
import { AdminDtrReadAddComponent } from './admin-dtr/admin-dtr-read-add/admin-dtr-read-add.component';
import { AdminDtrReadViewComponent } from './admin-dtr/admin-dtr-read-view/admin-dtr-read-view.component';
import { AdminDtrLossReportComponent } from './admin-dtr/admin-dtr-loss-report/admin-dtr-loss-report.component';
import { AdminFeederTndLossReportComponent } from './admin-feeder/admin-feeder-tnd-loss-report/admin-feeder-tnd-loss-report.component';
import { AdminFeederTndLossReportWithoutHtComponent } from './admin-feeder/admin-feeder-tnd-loss-report-without-ht/admin-feeder-tnd-loss-report-without-ht.component';
import { AdminFeederAtncLossReportComponent } from './admin-feeder/admin-feeder-atnc-loss-report/admin-feeder-atnc-loss-report.component';
import { AdminDtrPreBillingComponent } from './admin-dtr/admin-dtr-pre-billing/admin-dtr-pre-billing.component';
import { AdminHtConsumerViewComponent } from './admin-ht-consumer/admin-ht-consumer-view/admin-ht-consumer-view.component';
import { AdminHtConsumerViewConsumptionComponent } from './admin-ht-consumer/admin-ht-consumer-view-consumption/admin-ht-consumer-view-consumption.component';
import { AdminHtConsumerViewAbsentConsumptionComponent } from './admin-ht-consumer/admin-ht-consumer-view-absent-consumption/admin-ht-consumer-view-absent-consumption.component';
import { AdminBillFileUploadComponent } from './admin-bill-file/admin-bill-file-upload/admin-bill-file-upload.component';
import { AdminFeederInitialReadAddComponent } from './admin-feeder/admin-feeder-initial-read-add/admin-feeder-initial-read-add.component';
import { AdminFeederMappingAddComponent } from './admin-feeder/admin-feeder-mapping-add/admin-feeder-mapping-add.component';

const adminRoutes: Routes = [
  {
    path: '', 
    component: AdminComponent,
    canActivate: [CanActivateAuthGuard],
    data: {
      expectedRoles: [GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN, GlobalConfiguration.ROLE_FIELD_ADMIN]
    },
    children: [
      {
        path: '',
        canActivateChild: [CanActivateAuthGuard],
        children: [
          {
            path: 'home', component: AdminHomeComponent
          },
          {
            path: 'substation/add', component: AdminSubstationAddComponent
          },
          {
            path: 'substation/view',component: AdminSubstationViewComponent
          },
          {
            path: 'feeder/add', component: AdminFeederAddComponent
          },
          {
            path: 'feeder/view',component: AdminFeederViewComponent
          },
          {
            path: 'feeder/initial/reading/add', component: AdminFeederInitialReadAddComponent
          },
          {
            path: 'feeder/mapping/add', component: AdminFeederMappingAddComponent
          },
          {
            path: 'feeder/reading/add', component: AdminFeederReadingAddComponent
          },
          {
            path: 'feeder/reading/view',component: AdminFeederReadingViewComponent
          },
          {
            path: 'feeder/reading/absent/view',component: AdminFeederAbsentReadingViewComponent
          },
          {
            path: 'feeder/tnd/loss/report',component: AdminFeederTndLossReportComponent
          },
          {
            path: 'feeder/tnd/loss/report/without-ht',component: AdminFeederTndLossReportWithoutHtComponent
          },
          {
            path: 'feeder/atnc/loss/report',component: AdminFeederAtncLossReportComponent
          },
          {
            path: 'dtr/add', component: AdminDtrAddComponent
          },
          {
            path: 'dtr/view',component: AdminDtrViewComponent
          },
          {
            path: 'dtr/read/add/initial-read',component: AdminDtrAddInitialReadComponent
          },
          {
            path: 'dtr/read/add',component: AdminDtrReadAddComponent
          },
          {
            path: 'dtr/read/view',component: AdminDtrReadViewComponent
          },
          {
            path: 'dtr/generate/loss/report',component: AdminDtrLossReportComponent
          },
          {
            path: 'dtr/pre-billing',component: AdminDtrPreBillingComponent
          },
          {
            path: 'ht/consumer/view',component: AdminHtConsumerViewComponent
          },
          {
            path: 'ht/consumer/view/consumption',component: AdminHtConsumerViewConsumptionComponent
          },
          {
            path: 'ht/consumer/view/absent-consumption',component: AdminHtConsumerViewAbsentConsumptionComponent
          },
          {
            path: 'bill-file/upload',component: AdminBillFileUploadComponent
          },
          {
            path: '', redirectTo: 'home', pathMatch: 'full'
          }
        ]
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports : [RouterModule]
})
export class AdminRoutingModule { }
