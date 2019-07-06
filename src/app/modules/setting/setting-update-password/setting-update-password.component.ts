import { Component, OnInit } from '@angular/core';
import { SettingMenuService } from '../setting-menu.service';
import { GlobalResources } from 'app/utility/global.resources';

@Component({
  selector: 'eas-setting-update-password',
  templateUrl: './setting-update-password.component.html',
  styleUrls: ['./setting-update-password.component.css']
})
export class SettingUpdatePasswordComponent implements OnInit {

  formData: any = {};
  constructor(private settingMenuService: SettingMenuService, public globalResources: GlobalResources) { 
    if(!this.settingMenuService.THIRD_MENU.active){
      this.settingMenuService.menuClicked(this.settingMenuService.THIRD_MENU);
    }
  }

  ngOnInit() {
  }

  submitClicked(updatePasswordForm){
    if(this.globalResources.validateForm(updatePasswordForm)){
      console.log("valid form");
    }
  }

  resetClicked(){

  }

}
