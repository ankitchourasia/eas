import { Component, OnInit } from '@angular/core';
import { SettingMenuService } from '../setting-menu.service';

@Component({
  selector: 'eas-setting-home',
  templateUrl: './setting-home.component.html',
  styleUrls: ['./setting-home.component.css']
})
export class SettingHomeComponent implements OnInit {

  constructor(private settingMenuService: SettingMenuService) { 
    if(!this.settingMenuService.FIRST_MENU.active){
      this.settingMenuService.menuClicked(this.settingMenuService.FIRST_MENU);
    }
  }

  ngOnInit() {
  }

}
