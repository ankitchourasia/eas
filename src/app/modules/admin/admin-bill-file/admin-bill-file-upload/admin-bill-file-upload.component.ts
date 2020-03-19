import { Component, OnInit } from '@angular/core';
import { AdminBillFileMenuService } from '../admin-bill-file-menu.service';

@Component({
  selector: 'eas-admin-bill-file-upload',
  templateUrl: './admin-bill-file-upload.component.html',
  styleUrls: ['./admin-bill-file-upload.component.css']
})
export class AdminBillFileUploadComponent implements OnInit {

  constructor(private adminBillFileMenuService: AdminBillFileMenuService) { 
    if(!this.adminBillFileMenuService.SECOND_MENU.active){
      this.adminBillFileMenuService.menuClicked(this.adminBillFileMenuService.SECOND_MENU);
    }
  }

  ngOnInit() {
  }

}
