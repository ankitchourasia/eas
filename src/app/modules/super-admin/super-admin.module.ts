import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminComponent } from './super-admin.component';
import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { HeaderComponentModule } from '@eas-components/header/header-component.module';
import { SuperAdminHomeComponent } from './super-admin-home/super-admin-home.component';
import { SuperAdminRegionModule } from './super-admin-region/super-admin-region.module';
import { SuperAdminCircleModule } from './super-admin-circle/super-admin-circle.module';
import { SuperAdminDivisionModule } from './super-admin-division/super-admin-division.module';
import { SuperAdminZoneModule } from './super-admin-zone/super-admin-zone.module';
import { SuperAdminUserModule } from './super-admin-user/super-admin-user.module';

@NgModule({
  declarations: [SuperAdminComponent, SuperAdminHomeComponent],
  imports: [
    CommonModule, 
    HeaderComponentModule,
    SuperAdminRegionModule,
    SuperAdminCircleModule,
    SuperAdminDivisionModule,
    SuperAdminZoneModule,
    SuperAdminUserModule,
    SuperAdminRoutingModule
  ]
})
export class SuperAdminModule { }
