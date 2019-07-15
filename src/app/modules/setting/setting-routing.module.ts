import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from './setting.component';
import { SettingHomeComponent } from './setting-home/setting-home.component';
import { SettingUpdateProfileComponent } from './setting-update-profile/setting-update-profile.component';
import { SettingUpdatePasswordComponent } from './setting-update-password/setting-update-password.component';
import { CanActivateAuthGuard } from 'app/guards/can-activate.authguard';
import { GlobalConfiguration } from 'app/utility/global-configuration';

const settingRoutes: Routes = [
  {
    path: '', 
    component: SettingComponent, 
    canActivate: [CanActivateAuthGuard],
    data: {
      expectedRoles: [GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN]
    },
    children: [
      {
        path: '',
        canActivateChild: [CanActivateAuthGuard],
        children: [
          {
            path: 'home', component: SettingHomeComponent
          },
          {
            path: 'setting/update/profile', component: SettingUpdateProfileComponent
          },
          {
            path: 'setting/update/password', component: SettingUpdatePasswordComponent
          },
          {
            path: '', redirectTo: 'home', pathMatch: 'full'
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(settingRoutes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
