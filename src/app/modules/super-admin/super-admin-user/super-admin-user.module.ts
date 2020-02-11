import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminUserAddComponent } from './super-admin-user-add/super-admin-user-add.component';
import { UserComponentModule } from '@eas-components/user/user-component.module';
import { SuperAdminUserComponent } from './super-admin-user.component';
import { SuperAdminUserHomeComponent } from './super-admin-user-home/super-admin-user-home.component';
import { SuperAdminUserRoutingModule } from './super-admin-user-routing.module';
import { SuperAdminUserMenuService } from './super-admin-user-menu.service';

@NgModule({
  imports: [
    CommonModule,
    UserComponentModule,
    SuperAdminUserRoutingModule
  ],
  declarations: [
    SuperAdminUserComponent, 
    SuperAdminUserAddComponent, 
    SuperAdminUserHomeComponent
  ],
  providers: [
    SuperAdminUserMenuService
  ]
})
export class SuperAdminUserModule { }
