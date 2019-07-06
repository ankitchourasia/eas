import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { SettingHomeComponent } from './setting-home/setting-home.component';
import { SettingUpdatePasswordComponent } from './setting-update-password/setting-update-password.component';
import { SettingUpdateProfileComponent } from './setting-update-profile/setting-update-profile.component';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from '@eas-directives/directive.module';
import { HeaderModule } from '@eas-components/header/header.module';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingMenuService } from './setting-menu.service';

@NgModule({
  declarations: [
    SettingComponent,
    SettingHomeComponent,
    SettingUpdatePasswordComponent,
    SettingUpdateProfileComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    FormsModule,
    DirectiveModule,
    SettingRoutingModule
  ],
  providers: [
    SettingMenuService
  ]
})
export class SettingModule { }
