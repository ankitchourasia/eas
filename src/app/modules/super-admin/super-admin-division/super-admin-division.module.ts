import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminDivisionViewComponent } from './super-admin-division-view/super-admin-division-view.component';
import { SuperAdminDivisionAddComponent } from './super-admin-division-add/super-admin-division-add.component';
import { DivisionComponentModule } from '@eas-components/division/division-component.module';
import { SuperAdminDivisionComponent } from './super-admin-division.component';
import { SuperAdminDivisionHomeComponent } from './super-admin-division-home/super-admin-division-home.component';
import { SuperAdminDivisionRoutingModule } from './super-admin-division-routing.module';
import { SuperAdminDivisionMenuService } from './super-admin-division-menu.service';

@NgModule({
  imports: [
    CommonModule,
    DivisionComponentModule,
    SuperAdminDivisionRoutingModule
  ],
  declarations: [
    SuperAdminDivisionViewComponent, 
    SuperAdminDivisionAddComponent, 
    SuperAdminDivisionComponent, 
    SuperAdminDivisionHomeComponent
  ],
  providers: [
    SuperAdminDivisionMenuService
  ]
})
export class SuperAdminDivisionModule { }
