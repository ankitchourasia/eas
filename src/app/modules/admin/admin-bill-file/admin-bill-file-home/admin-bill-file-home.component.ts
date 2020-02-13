import { Component, OnInit } from '@angular/core';
import { AdminBillFileMenuService } from '../admin-bill-file-menu.service';

@Component({
  selector: 'eas-admin-bill-file-home',
  templateUrl: './admin-bill-file-home.component.html',
  styleUrls: ['./admin-bill-file-home.component.css']
})
export class AdminBillFileHomeComponent implements OnInit {

  constructor(private adminBillFileMenuService: AdminBillFileMenuService) { 
    if(!this.adminBillFileMenuService.FIRST_MENU.active){
      this.adminBillFileMenuService.menuClicked(this.adminBillFileMenuService.FIRST_MENU);
    }
  }


  ngOnInit() {
  }

}
