import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHtConsumerViewComponent } from './admin-ht-consumer-view/admin-ht-consumer-view.component';
import { AdminHtConsumerViewConsumptionComponent } from './admin-ht-consumer-view-consumption/admin-ht-consumer-view-consumption.component';
import { AdminHtConsumerViewAbsentConsumptionComponent } from './admin-ht-consumer-view-absent-consumption/admin-ht-consumer-view-absent-consumption.component';
import { HTConsumerComponentModule } from '@eas-components/ht-consumer/ht-consumer-component.module';
import { AdminHtConsumerAddComponent } from './admin-ht-consumer-add/admin-ht-consumer-add.component';
import { AdminHtConsumerReadingAddComponent } from './admin-ht-consumer-reading-add/admin-ht-consumer-reading-add.component';

@NgModule({
  declarations: [
    AdminHtConsumerViewComponent, 
    AdminHtConsumerViewConsumptionComponent, 
    AdminHtConsumerViewAbsentConsumptionComponent,
    AdminHtConsumerAddComponent,
    AdminHtConsumerReadingAddComponent,
  ],
  imports: [
    CommonModule,
    HTConsumerComponentModule
  ]
})
export class AdminHtConsumerModule { }
