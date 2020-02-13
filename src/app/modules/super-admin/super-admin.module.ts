import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminComponent } from './super-admin.component';
import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { HeaderComponentModule } from '@eas-components/header/header-component.module';
import { SuperAdminHomeComponent } from './super-admin-home/super-admin-home.component';
import { SuperAdminMenuService } from './super-admin-menu.service';

@NgModule({
  imports: [
    CommonModule, 
    HeaderComponentModule,
    SuperAdminRoutingModule
  ],
  declarations: [
    SuperAdminComponent, 
    SuperAdminHomeComponent
  ],
  providers: [
    SuperAdminMenuService
  ]
})
export class SuperAdminModule { }
