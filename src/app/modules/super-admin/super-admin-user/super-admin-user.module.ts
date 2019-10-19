import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminUserAddComponent } from './super-admin-user-add/super-admin-user-add.component';
import { UserComponentModule } from '@eas-components/user/user-component.module';

@NgModule({
  declarations: [SuperAdminUserAddComponent],
  imports: [
    CommonModule,
    UserComponentModule
  ]
})
export class SuperAdminUserModule { }
