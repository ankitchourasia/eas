import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminSubstationAddComponent } from './admin-substation-add/admin-substation-add.component';
import { AdminSubstationViewComponent } from './admin-substation-view/admin-substation-view.component';
import { HeaderModule } from '@eas-components/header/header.module';
import { SubstationModule } from '@eas-components/substation/substation.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    SubstationModule,
    AdminRoutingModule
  ],
  declarations: [AdminComponent, AdminHomeComponent, AdminSubstationAddComponent, AdminSubstationViewComponent]
})
export class AdminModule { }
