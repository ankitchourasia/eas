import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSubstationComponent } from './admin-substation.component';
import { AdminSubstationHomeComponent } from './admin-substation-home/admin-substation-home.component';
import { AdminSubstationAddComponent } from './admin-substation-add/admin-substation-add.component';
import { AdminSubstationViewComponent } from './admin-substation-view/admin-substation-view.component';
import { SubstationComponentModule } from '@eas-components/substation/substation-component.module';
import { AdminSubstationRoutingModule } from './admin-substation-routing.module';
import { AdminSubstationMenuService } from './admin-substation-menu.service';

@NgModule({
  imports: [
    CommonModule,
    SubstationComponentModule,
    AdminSubstationRoutingModule
  ],
  declarations: [
    AdminSubstationComponent,
    AdminSubstationHomeComponent,
    AdminSubstationAddComponent,
    AdminSubstationViewComponent,
  ],
  providers: [
    AdminSubstationMenuService
  ]
})
export class AdminSubstationModule { }
