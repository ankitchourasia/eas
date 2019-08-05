import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminCircleAddComponent } from './super-admin-circle-add/super-admin-circle-add.component';
import { SuperAdminCircleViewComponent } from './super-admin-circle-view/super-admin-circle-view.component';
import { CircleComponentModule } from '@eas-components/circle/circle-component.module';

@NgModule({
  declarations: [SuperAdminCircleAddComponent, SuperAdminCircleViewComponent],
  imports: [
    CommonModule,
    CircleComponentModule
  ]
})
export class SuperAdminCircleModule { }
