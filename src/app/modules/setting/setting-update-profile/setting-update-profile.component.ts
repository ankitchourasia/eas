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
  user : any = {};
  constructor(private settingMenuService: SettingMenuService, public globalResources: GlobalResources) { 
    if(!this.settingMenuService.SECOND_MENU.active){
      this.settingMenuService.menuClicked(this.settingMenuService.SECOND_MENU);
    }
  }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
    this.initializedUser();
  }

  initializedUser(){
    this.formData.username = this.user.username;
    this.formData.name = this.user.name;
    this.formData.role = this.user.role;
    this.formData.mobileNo = this.user.mobileNo;
  }

  submitClicked(updateProfileForm){
    if(this.globalResources.validateForm(updateProfileForm)){
      console.log(this.formData);
    }
  }

  resetClicked(){
    this.initializedUser();
  }

}
