import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminCircleAddComponent } from './super-admin-circle-add/super-admin-circle-add.component';
import { SuperAdminCircleViewComponent } from './super-admin-circle-view/super-admin-circle-view.component';
import { CircleComponentModule } from '@eas-components/circle/circle-component.module';
import { SuperAdminCircleHomeComponent } from './super-admin-circle-home/super-admin-circle-home.component';
import { SuperAdminCircleComponent } from './super-admin-circle.component';
import { SuperAdminCircleMenuService } from './super-admin-circle-menu.service';
import { SuperAdminCircleRoutingModule } from './super-admin-circle-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CircleComponentModule,
    SuperAdminCircleRoutingModule
  ],
  declarations: [
    SuperAdminCircleAddComponent,
    SuperAdminCircleViewComponent,
    SuperAdminCircleHomeComponent,
    SuperAdminCircleComponent
  ],
  providers: [
    SuperAdminCircleMenuService
  ]  
})
export class SuperAdminCircleModule { }
