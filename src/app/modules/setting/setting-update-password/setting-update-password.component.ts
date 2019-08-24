import { Component, OnInit } from '@angular/core';
import { SettingMenuService } from '../setting-menu.service';
import { GlobalResources } from '@eas-utility/global.resources';

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
    let user =this.globalResources.getUserDetails();
    console.log(user);
  }

  submitClicked(updatePasswordForm){
    if(this.globalResources.validateForm(updatePasswordForm)){
      console.log(this.formData);
    }
  }

  resetClicked(){

  }

  currentPasswordChanged(currentPasswordNgModel){
    if(this.formData.currentPassword && this.formData.currentPassword !== "sonal#123"){
      currentPasswordNgModel.control.setErrors({ 'invalid-password': true })
    }else if(this.formData.currentPassword && this.formData.currentPassword === "sonal#123"){
      currentPasswordNgModel.control.setErrors(null)
    }
  }

  newPasswordChanged(newPasswordNgModel){
    if(this.formData.newPassword && this.formData.currentPassword && (this.formData.newPassword === this.formData.currentPassword)){
      newPasswordNgModel.control.setErrors({ 'same-password': true });
    }else if(this.formData.newPassword && this.formData.currentPassword && (this.formData.newPassword !== this.formData.currentPassword)){
      newPasswordNgModel.control.setErrors(null)
    }
  }

}
