import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { HeaderModule } from 'src/app/components/header/header.module';
import { AdminSubstationAddComponent } from './admin-substation-add/admin-substation-add.component';
import { AdminSubstationViewComponent } from './admin-substation-view/admin-substation-view.component';
import { SubstationModule } from 'src/app/components/substation/substation.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    HeaderModule,
    SubstationModule
  ],
  declarations: [AdminComponent, AdminHomeComponent, AdminSubstationAddComponent, AdminSubstationViewComponent]
})
export class AdminModule { }
