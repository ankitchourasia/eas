import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminRegionAddComponent } from './super-admin-region-add/super-admin-region-add.component';
import { SuperAdminRegionViewComponent } from './super-admin-region-view/super-admin-region-view.component';
import { RegionComponentModule } from '@eas-components/region/region-component.module';

@NgModule({
  declarations: [SuperAdminRegionAddComponent, SuperAdminRegionViewComponent],
  imports: [
    CommonModule,
    RegionComponentModule
  ]
})
export class SuperAdminRegionModule { }
