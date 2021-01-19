import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHTConsumer11KVViewComponent } from './admin-ht-consumer-11kv-view/admin-ht-consumer-11kv-view.component';
import { AdminHTConsumer11KVReadingViewComponent } from './admin-ht-consumer-11kv-reading-view/admin-ht-consumer-11kv-reading-view.component';
import { AdminHTConsumer11KVReadingViewAbsentComponent } from './admin-ht-consumer-11kv-reading-view-absent/admin-ht-consumer-11kv-reading-view-absent.component';
import { HTConsumerComponentModule } from '@eas-components/ht-consumer/ht-consumer-component.module';
import { AdminHTConsumer11KVAddComponent } from './admin-ht-consumer-11kv-add/admin-ht-consumer-11kv-add.component';
import { AdminHTConsumer11KVReadingAddComponent } from './admin-ht-consumer-11kv-reading-add/admin-ht-consumer-11kv-reading-add.component';
import { AdminHTConsumer33KVReadingAddComponent } from './admin-ht-consumer-33kv-reading-add/admin-ht-consumer-33kv-reading-add.component';
import { AdminHTConsumer33KVAddComponent } from './admin-ht-consumer-33kv-add/admin-ht-consumer-33kv-add.component';
import { AdminHTConsumerHomeComponent } from './admin-ht-consumer-home/admin-ht-consumer-home.component';
import { AdminHTConsumerComponent } from './admin-ht-consumer.component';
import { AdminHTConsumerRoutingModule } from './admin-ht-consumer-routing.module';
import { AdminHTConsumerMenuService } from './admin-ht-consumer-menu.service';
import { AdminHTConsumer33KVReadingViewComponent } from './admin-ht-consumer-33kv-reading-view/admin-ht-consumer-33kv-reading-view.component';
import { AdminHTConsumer33KVViewComponent } from './admin-ht-consumer-33kv-view/admin-ht-consumer-33kv-view.component';
import { AdminHTConsumer11KVReadUploadComponent } from './admin-ht-consumer-11kv-read-upload/admin-ht-consumer-11kv-read-upload.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HTConsumerComponentModule,
    AdminHTConsumerRoutingModule
  ],
  declarations: [
    AdminHTConsumerComponent,
    AdminHTConsumerHomeComponent,
    AdminHTConsumer11KVAddComponent,
    AdminHTConsumer11KVViewComponent, 
    AdminHTConsumer33KVAddComponent,
    AdminHTConsumer11KVReadingAddComponent,
    AdminHTConsumer11KVReadingViewComponent, 
    AdminHTConsumer11KVReadingViewAbsentComponent,
    AdminHTConsumer33KVReadingAddComponent,
    AdminHTConsumer33KVReadingViewComponent,
    AdminHTConsumer33KVViewComponent,
    AdminHTConsumer11KVReadUploadComponent,
  ],
  providers: [
    AdminHTConsumerMenuService
  ]
})
export class AdminHTConsumerModule { }
