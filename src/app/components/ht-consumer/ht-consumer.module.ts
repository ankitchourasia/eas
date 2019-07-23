import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtConsumerViewComponent } from './ht-consumer-view/ht-consumer-view.component';
import { HtConsumerViewAbsentConsumptionComponent } from './ht-consumer-view-absent-consumption/ht-consumer-view-absent-consumption.component';
import { HtConsumerViewConsumptionComponent } from './ht-consumer-view-consumption/ht-consumer-view-consumption.component';

@NgModule({
  declarations: [
    HtConsumerViewComponent, 
    HtConsumerViewConsumptionComponent,
    HtConsumerViewAbsentConsumptionComponent
  ],
  exports: [
    HtConsumerViewComponent, 
    HtConsumerViewConsumptionComponent,
    HtConsumerViewAbsentConsumptionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HTConsumerModule { }
