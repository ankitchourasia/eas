import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from './setting.component';
import { SettingHomeComponent } from './setting-home/setting-home.component';
import { SettingUpdateProfileComponent } from './setting-update-profile/setting-update-profile.component';
import { SettingUpdatePasswordComponent } from './setting-update-password/setting-update-password.component';

const settingRoutes: Routes = [
  {
    path: '', component: SettingComponent, 
    children: [
      {
        path: '',
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
