import { Component, OnInit } from '@angular/core';
import { SettingMenuService } from '../setting-menu.service';

@Component({
  selector: 'eas-setting-update-password',
  templateUrl: './setting-update-password.component.html',
  styleUrls: ['./setting-update-password.component.css']
})
export class SettingUpdatePasswordComponent implements OnInit {

  constructor(private settingMenuService: SettingMenuService) { 
    if(!this.settingMenuService.THIRD_MENU.active){
      this.settingMenuService.menuClicked(this.settingMenuService.THIRD_MENU);
    }
  }

  ngOnInit() {
  }

}
