import { Component, OnInit } from '@angular/core';
import { SettingMenuService } from '../setting-menu.service';
import { GlobalResources } from 'app/utility/global.resources';

@Component({
  selector: 'eas-setting-update-profile',
  templateUrl: './setting-update-profile.component.html',
  styleUrls: ['./setting-update-profile.component.css']
})
export class SettingUpdateProfileComponent implements OnInit {

  formData: any = {};
  constructor(private settingMenuService: SettingMenuService, public globalResources: GlobalResources) { 
    if(!this.settingMenuService.SECOND_MENU.active){
      this.settingMenuService.menuClicked(this.settingMenuService.SECOND_MENU);
    }
  }

  ngOnInit() {
  }

  submitClicked(updateProfileForm){
    if(this.globalResources.validateForm(updateProfileForm)){
      console.log("valid form");
    }
  }

  resetClicked(){

  }

}
