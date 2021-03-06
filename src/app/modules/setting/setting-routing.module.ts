import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from './setting.component';
import { SettingHomeComponent } from './setting-home/setting-home.component';
import { SettingUpdateProfileComponent } from './setting-update-profile/setting-update-profile.component';
import { SettingUpdatePasswordComponent } from './setting-update-password/setting-update-password.component';
import { CanActivateAuthGuard } from 'app/guards/can-activate.authguard';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

const routes: Routes = [
  {
    canActivate: [CanActivateAuthGuard],
    data: { expectedRoles: [GlobalConfiguration.ROLE_ADMIN, GlobalConfiguration.ROLE_FIELD_ADMIN, GlobalConfiguration.ROLE_SUPER_ADMIN] },
    path: '', component: SettingComponent, 
    children: [
      {
        path: '', children: [
          {
            path: 'home', component: SettingHomeComponent
          },
          {
            path: 'profile/update', component: SettingUpdateProfileComponent
          },
          {
            path: 'password/update', component: SettingUpdatePasswordComponent
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
