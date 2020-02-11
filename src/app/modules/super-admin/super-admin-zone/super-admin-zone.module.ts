import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminZoneAddComponent } from './super-admin-zone-add/super-admin-zone-add.component';
import { SuperAdminZoneViewComponent } from './super-admin-zone-view/super-admin-zone-view.component';
import { ZoneComponentModule } from '@eas-components/zone/zone-component.module';
import { SuperAdminZoneHomeComponent } from './super-admin-zone-home/super-admin-zone-home.component';
import { SuperAdminZoneComponent } from './super-admin-zone.component';
import { SuperAdminZoneRoutingModule } from './super-admin-zone-routing.module';
import { SuperAdminZoneMenuService } from './super-admin-zone-menu.service';

@NgModule({
  imports: [
    CommonModule,
    ZoneComponentModule,
    SuperAdminZoneRoutingModule
  ],
  declarations: [
    SuperAdminZoneAddComponent, 
    SuperAdminZoneViewComponent, 
    SuperAdminZoneHomeComponent, 
    SuperAdminZoneComponent
  ],
  providers: [
    SuperAdminZoneMenuService
  ]
})
export class SuperAdminZoneModule { }
