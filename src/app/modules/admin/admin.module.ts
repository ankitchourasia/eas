import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminSubstationAddComponent } from './admin-substation-add/admin-substation-add.component';
import { AdminSubstationViewComponent } from './admin-substation-view/admin-substation-view.component';
import { HeaderModule } from '@eas-components/header/header.module';
import { SubstationModule } from '@eas-components/substation/substation.module';
import { AdminFeederAddComponent } from './admin-feeder-add/admin-feeder-add.component';
import { AdminFeederViewComponent } from './admin-feeder-view/admin-feeder-view.component';
import { FeederModule } from '@eas-components/feeder/feeder.module';
import { AdminDtrAddComponent } from './admin-dtr-add/admin-dtr-add.component';
import { AdminDtrViewComponent } from './admin-dtr-view/admin-dtr-view.component';
import { DtrComponentModule } from '@eas-components/dtr/dtr-component.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    SubstationModule,
    FeederModule,
    DtrComponentModule,
    AdminRoutingModule,
  ],
  declarations: [
    AdminComponent,
    AdminHomeComponent,
    AdminSubstationAddComponent,
    AdminSubstationViewComponent,
    AdminFeederAddComponent,
    AdminFeederViewComponent,
    AdminDtrAddComponent,
    AdminDtrViewComponent
  ]
})
export class AdminModule { }
