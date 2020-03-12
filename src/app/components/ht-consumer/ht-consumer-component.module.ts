import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtConsumerViewComponent } from './ht-consumer-view/ht-consumer-view.component';
import { HtConsumerViewAbsentConsumptionComponent } from './ht-consumer-view-absent-consumption/ht-consumer-view-absent-consumption.component';
import { HtConsumerViewConsumptionComponent } from './ht-consumer-view-consumption/ht-consumer-view-consumption.component';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from '@eas-directives/directive.module';
import { HtConsumerReadingAddComponent } from './ht-consumer-reading-add/ht-consumer-reading-add.component';
import { HtConsumerAddComponent } from './ht-consumer-add/ht-consumer-add.component';
import { HtConsumer33KVAddComponent } from './ht-consumer-33kv-add/ht-consumer-33kv-add.component';
import { HtConsumer33KVReadingAddComponent } from './ht-consumer-33kv-reading-add/ht-consumer-33kv-reading-add.component';
import { HtConsumer33KVViewComponent } from './ht-consumer-33kv-view/ht-consumer-33kv-view.component';
import { HtConsumer33KVReadingViewComponent } from './ht-consumer-33kv-reading-view/ht-consumer-33kv-reading-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule,
  ],
  declarations: [
    HtConsumerViewComponent, 
    HtConsumerViewConsumptionComponent,
    HtConsumerViewAbsentConsumptionComponent,
    HtConsumerReadingAddComponent,
    HtConsumerAddComponent,
    HtConsumer33KVAddComponent,
    HtConsumer33KVReadingAddComponent,
    HtConsumer33KVViewComponent,
    HtConsumer33KVReadingViewComponent
  ],
  exports: [
    HtConsumerViewComponent, 
    HtConsumerViewConsumptionComponent,
    HtConsumerViewAbsentConsumptionComponent,
    HtConsumerReadingAddComponent,
    HtConsumerAddComponent,
    HtConsumer33KVAddComponent,
    HtConsumer33KVReadingAddComponent,
    HtConsumer33KVViewComponent,
    HtConsumer33KVReadingViewComponent
  ],
  
})
export class HTConsumerComponentModule { }
