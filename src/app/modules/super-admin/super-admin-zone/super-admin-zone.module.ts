import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminZoneAddComponent } from './super-admin-zone-add/super-admin-zone-add.component';
import { SuperAdminZoneViewComponent } from './super-admin-zone-view/super-admin-zone-view.component';
import { ZoneComponentModule } from '@eas-components/zone/zone-component.module';

@NgModule({
  declarations: [SuperAdminZoneAddComponent, SuperAdminZoneViewComponent],
  imports: [
    CommonModule,
    ZoneComponentModule
  ]
})
export class SuperAdminZoneModule { }
