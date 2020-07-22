import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CanActivateAuthGuard } from 'app/guards/can-activate.authguard';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

const routes: Routes = [
  {
    canActivate: [CanActivateAuthGuard],
    data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] },
    path: '', component: AdminComponent,
    children: [
      {
        path: '', children: [
          {
            path: 'home', component: AdminHomeComponent
          },
          {
            path: 'substation',
            loadChildren: () => import('app/modules/admin/admin-substation/admin-substation.module').then(m => m.AdminSubstationModule)
          },
          // {
          //   path: 'bill-file',
          //   loadChildren: () => import('app/modules/admin/admin-bill-file/admin-bill-file.module').then(m => m.AdminBillFileModule)
          // },
          // {
          //   path: 'dtr',
          //   loadChildren: () => import('app/modules/admin/admin-dtr/admin-dtr.module').then(m => m.AdminDtrModule)
          // },
          {
            path: 'feeder-33kv',
            loadChildren: () => import('app/modules/admin/admin-feeder-33kv/admin-feeder-33kv.module').then(m => m.AdminFeeder33KVModule)
          },
          {
            path: 'feeder-11kv',
            loadChildren: () => import('app/modules/admin/admin-feeder-11kv/admin-feeder-11kv.module').then(m => m.AdminFeeder11KVModule)
          },
          {
            path: 'ht-consumer',
            loadChildren: () => import('app/modules/admin/admin-ht-consumer/admin-ht-consumer.module').then(m => m.AdminHTConsumerModule)
          },
          {
            path: 'report',
            loadChildren: () => import('app/modules/admin/admin-report/admin-report.module').then(m => m.AdminReportModule)
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
    RouterModule.forChild(routes)
  ],
  exports : [RouterModule]
})
export class AdminRoutingModule { }
