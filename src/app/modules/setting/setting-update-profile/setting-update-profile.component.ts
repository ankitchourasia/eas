import { Component, OnInit } from '@angular/core';
import { SettingMenuService } from '../setting-menu.service';

@Component({
  selector: 'eas-setting-update-profile',
  templateUrl: './setting-update-profile.component.html',
  styleUrls: ['./setting-update-profile.component.css']
})
export class SettingUpdateProfileComponent implements OnInit {

  constructor(private settingMenuService: SettingMenuService) { 
    if(!this.settingMenuService.SECOND_MENU.active){
      this.settingMenuService.menuClicked(this.settingMenuService.SECOND_MENU);
    }
  }

  ngOnInit() {
  }

}
