import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminRegionAddComponent } from './super-admin-region-add/super-admin-region-add.component';
import { SuperAdminRegionViewComponent } from './super-admin-region-view/super-admin-region-view.component';
import { RegionComponentModule } from '@eas-components/region/region-component.module';
import { SuperAdminRegionHomeComponent } from './super-admin-region-home/super-admin-region-home.component';
import { SuperAdminRegionComponent } from './super-admin-region.component';
import { SuperAdminRegionRoutingModule } from './super-admin-region-routing.module';
import { SuperAdminRegionMenuService } from './super-admin-region-menu.service';

@NgModule({
  imports: [
    CommonModule,
    RegionComponentModule,
    SuperAdminRegionRoutingModule
  ],
  declarations: [
    SuperAdminRegionAddComponent, 
    SuperAdminRegionViewComponent, 
    SuperAdminRegionHomeComponent, 
    SuperAdminRegionComponent
  ],
  providers:[
    SuperAdminRegionMenuService
  ]
})
export class SuperAdminRegionModule { }
