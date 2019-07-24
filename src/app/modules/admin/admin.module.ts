import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponentModule } from '@eas-components/header/header-component.module';
import { AdminSubstationModule } from './admin-substation/admin-substation.module';
import { AdminFeederModule } from './admin-feeder/admin-feeder.module';
import { AdminDtrModule } from './admin-dtr/admin-dtr.module';
import { AdminHtConsumerModule } from './admin-ht-consumer/admin-ht-consumer.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderComponentModule,
    AdminSubstationModule,
    AdminFeederModule,
    AdminDtrModule,
    AdminHtConsumerModule,
    AdminRoutingModule,
  ],
  declarations: [
    AdminComponent,
    AdminHomeComponent,
    
  ]
})
export class AdminModule { }
