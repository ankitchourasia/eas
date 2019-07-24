import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHtConsumerViewComponent } from './admin-ht-consumer-view/admin-ht-consumer-view.component';
import { AdminHtConsumerViewConsumptionComponent } from './admin-ht-consumer-view-consumption/admin-ht-consumer-view-consumption.component';
import { AdminHtConsumerViewAbsentConsumptionComponent } from './admin-ht-consumer-view-absent-consumption/admin-ht-consumer-view-absent-consumption.component';
import { HTConsumerModule } from '@eas-components/ht-consumer/ht-consumer.module';

@NgModule({
  declarations: [AdminHtConsumerViewComponent, AdminHtConsumerViewConsumptionComponent, AdminHtConsumerViewAbsentConsumptionComponent],
  imports: [
    CommonModule,
    HTConsumerModule
  ]
})
export class AdminHtConsumerModule { }
