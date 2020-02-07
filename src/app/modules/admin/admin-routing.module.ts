import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CanActivateAuthGuard } from 'app/guards/can-activate.authguard';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { AdminFeederAddComponent } from './admin-feeder/admin-feeder-add/admin-feeder-add.component';
import { AdminFeederViewComponent } from './admin-feeder/admin-feeder-view/admin-feeder-view.component';
import { AdminFeederReadingAddComponent } from './admin-feeder/admin-feeder-reading-add/admin-feeder-reading-add.component';
import { AdminFeederReadingViewComponent } from './admin-feeder/admin-feeder-reading-view/admin-feeder-reading-view.component';
import { AdminFeederAbsentReadingViewComponent } from './admin-feeder/admin-feeder-absent-reading-view/admin-feeder-absent-reading-view.component';
import { AdminFeederTndLossReportComponent } from './admin-feeder/admin-feeder-tnd-loss-report/admin-feeder-tnd-loss-report.component';
import { AdminFeederTndLossReportWithoutHtComponent } from './admin-feeder/admin-feeder-tnd-loss-report-without-ht/admin-feeder-tnd-loss-report-without-ht.component';
import { AdminFeederAtncLossReportComponent } from './admin-feeder/admin-feeder-atnc-loss-report/admin-feeder-atnc-loss-report.component';
import { AdminExportPointViewComponent } from './admin-export/admin-export-point-view/admin-export-point-view.component';
import { AdminExportPointReadingViewComponent } from './admin-export/admin-export-point-reading-view/admin-export-point-reading-view.component';
import { AdminExportPointAddComponent } from './admin-export/admin-export-point-add/admin-export-point-add.component';
import { AdminFeederInitialReadAddComponent } from './admin-feeder/admin-feeder-initial-read-add/admin-feeder-initial-read-add.component';
import { AdminFeederMappingAddComponent } from './admin-feeder/admin-feeder-mapping-add/admin-feeder-mapping-add.component';
import { AdminExportPointReadingAddComponent } from './admin-export/admin-export-point-reading-add/admin-export-point-reading-add.component';
import { AdminFeederInterruptionAddComponent } from './admin-feeder/admin-feeder-interruption-add/admin-feeder-interruption-add.component';

const adminRoutes: Routes = [
  {
    path: '', 
    component: AdminComponent,
    canActivate: [CanActivateAuthGuard],
    data: {
      expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN]
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
            path: 'substation',
            loadChildren: 'app/modules/admin/admin-substation/admin-substation.module#AdminSubstationModule'
          },
          {
            path: 'bill-file',
            loadChildren: 'app/modules/admin/admin-bill-file/admin-bill-file.module#AdminBillFileModule'
          },
          {
            path: 'dtr',
            loadChildren: 'app/modules/admin/admin-dtr/admin-dtr.module#AdminDtrModule'
          },
          {
            path: 'feeder/33kv',
            loadChildren: 'app/modules/admin/admin-feeder-33kv/admin-feeder-33kv.module#AdminFeeder33KVModule'
          },
          {
            path: 'ht-consumer',
            loadChildren: 'app/modules/admin/admin-ht-consumer/admin-ht-consumer.module#AdminHTConsumerModule'
          },
          {
            path: 'report',
            loadChildren: 'app/modules/admin/admin-report/admin-report.module#AdminReportModule'
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
            path: 'feeder/interruption/add',component: AdminFeederInterruptionAddComponent
          },
          {
            path: 'export-point/add',component: AdminExportPointAddComponent
          },
          {
            path: 'export-point/view',component: AdminExportPointViewComponent
          },
          {
            path: 'export-point/read/add',component: AdminExportPointReadingAddComponent
          },
          {
            path: 'export-point/read/view',component: AdminExportPointReadingViewComponent
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
