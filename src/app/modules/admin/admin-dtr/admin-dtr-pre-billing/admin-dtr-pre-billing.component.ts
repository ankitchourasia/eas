import { Component, OnInit } from '@angular/core';
import { AdminDtrMenuService } from '../admin-dtr-menu.service';

@Component({
  selector: 'eas-admin-dtr-pre-billing',
  templateUrl: './admin-dtr-pre-billing.component.html',
  styleUrls: ['./admin-dtr-pre-billing.component.css']
})
export class AdminDtrPreBillingComponent implements OnInit {

  constructor(private adminDtrMenuService: AdminDtrMenuService) { 
    if(!this.adminDtrMenuService.LAST_MENU.active){
      this.adminDtrMenuService.menuClicked(this.adminDtrMenuService.LAST_MENU);
    }
  }

  ngOnInit() {
  }

}
