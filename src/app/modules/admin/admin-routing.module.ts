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
import { AdminReportD1Component } from './admin-report/admin-report-d1/admin-report-d1.component';
import { AdminReportD2Component } from './admin-report/admin-report-d2/admin-report-d2.component';
import { AdminReportD3Component } from './admin-report/admin-report-d3/admin-report-d3.component';
import { AdminReportD4Component } from './admin-report/admin-report-d4/admin-report-d4.component';
import { AdminReportD5Component } from './admin-report/admin-report-d5/admin-report-d5.component';
import { AdminReportD6Component } from './admin-report/admin-report-d6/admin-report-d6.component';
import { AdminReportD7Component } from './admin-report/admin-report-d7/admin-report-d7.component';
import { AdminFeederInterruptionAddComponent } from './admin-feeder/admin-feeder-interruption-add/admin-feeder-interruption-add.component';
import { AdminReportNscMonitoringComponent } from './admin-report/admin-report-nsc-monitoring/admin-report-nsc-monitoring.component';
import { AdminReportConsumerComplaintsRedressalComponent } from './admin-report/admin-report-consumer-complaints-redressal/admin-report-consumer-complaints-redressal.component';
import { AdminReportFeederJsonFileComponent } from './admin-report/admin-report-feeder-json-file/admin-report-feeder-json-file.component';

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
            path: 'report/d1',component: AdminReportD1Component
          },
          {
            path: 'report/d2',component: AdminReportD2Component
          },
          {
            path: 'report/d3',component: AdminReportD3Component
          },
          {
            path: 'report/d4',component: AdminReportD4Component
          },
          {
            path: 'report/d5',component: AdminReportD5Component
          },
          {
            path: 'report/d6',component: AdminReportD6Component
          },
          {
            path: 'report/d7',component: AdminReportD7Component
          },
          {
            path: 'report/nsc-monitoring',component: AdminReportNscMonitoringComponent
          },
          {
            path: 'report/consumer-complaints-redressal',component: AdminReportConsumerComplaintsRedressalComponent
          },
          {
            path: 'report/feeder/json',component: AdminReportFeederJsonFileComponent
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
