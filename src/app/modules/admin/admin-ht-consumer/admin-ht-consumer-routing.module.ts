import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHTConsumerComponent } from './admin-ht-consumer.component';
import { AdminHTConsumerHomeComponent } from './admin-ht-consumer-home/admin-ht-consumer-home.component';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { AdminHTConsumer11KVAddComponent } from './admin-ht-consumer-11kv-add/admin-ht-consumer-11kv-add.component';
import { AdminHTConsumer11KVViewComponent } from './admin-ht-consumer-11kv-view/admin-ht-consumer-11kv-view.component';
import { AdminHTConsumer11KVReadingAddComponent } from './admin-ht-consumer-11kv-reading-add/admin-ht-consumer-11kv-reading-add.component';
import { AdminHTConsumer11KVReadingViewComponent } from './admin-ht-consumer-11kv-reading-view/admin-ht-consumer-11kv-reading-view.component';
import { AdminHTConsumer11KVReadingViewAbsentComponent } from './admin-ht-consumer-11kv-reading-view-absent/admin-ht-consumer-11kv-reading-view-absent.component';
import { AdminHTConsumer33KVAddComponent } from './admin-ht-consumer-33kv-add/admin-ht-consumer-33kv-add.component';
import { AdminHTConsumer33KVReadingAddComponent } from './admin-ht-consumer-33kv-reading-add/admin-ht-consumer-33kv-reading-add.component';
import { AdminHTConsumer33KVViewComponent } from './admin-ht-consumer-33kv-view/admin-ht-consumer-33kv-view.component';
import { AdminHTConsumer33KVReadingViewComponent } from './admin-ht-consumer-33kv-reading-view/admin-ht-consumer-33kv-reading-view.component';
import { AdminHTConsumer11KVReadUploadComponent } from './admin-ht-consumer-11kv-read-upload/admin-ht-consumer-11kv-read-upload.component';

const routes: Routes = [
  {
    data: { expectedRoles: [GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] } ,
    path: '', component: AdminHTConsumerComponent,
    children: [
      { 
        path: 'home', component: AdminHTConsumerHomeComponent, 
      },
      {
        path: '11kv/add',component: AdminHTConsumer11KVAddComponent,
      },
      {
        path: '11kv/view',component: AdminHTConsumer11KVViewComponent,
      },
      {
        path: '11kv/read/add',component: AdminHTConsumer11KVReadingAddComponent,
      },
      {
        path: '11kv/read/view',component: AdminHTConsumer11KVReadingViewComponent,
      },
      {
        path: '11kv/read/view/absent',component: AdminHTConsumer11KVReadingViewAbsentComponent,
      },
      {
        path: '33kv/add',component: AdminHTConsumer33KVAddComponent,
      },
      {
        path: '33kv/read/add',component: AdminHTConsumer33KVReadingAddComponent,
      },
      {
        path: '33kv/view',component: AdminHTConsumer33KVViewComponent,
      },
      {
        path: '33kv/read/view',component: AdminHTConsumer33KVReadingViewComponent,
      },
      {
        path: '11kv/read/upload',component: AdminHTConsumer11KVReadUploadComponent,
      },
      { 
        path: '', redirectTo: 'home',
        pathMatch: 'full' 
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminHTConsumerRoutingModule { }
