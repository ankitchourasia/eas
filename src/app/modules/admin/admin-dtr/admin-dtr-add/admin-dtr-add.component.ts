import { Component, OnInit } from '@angular/core';
import { AdminDtrMenuService } from '../admin-dtr-menu.service';

@Component({
  selector: 'eas-admin-dtr-add',
  templateUrl: './admin-dtr-add.component.html',
  styleUrls: ['./admin-dtr-add.component.css']
})
export class AdminDtrAddComponent implements OnInit {

  constructor(private adminDtrMenuService: AdminDtrMenuService) { 
    if(!this.adminDtrMenuService.SECOND_MENU.active){
      this.adminDtrMenuService.menuClicked(this.adminDtrMenuService.SECOND_MENU);
    }
  }

  ngOnInit() {
  }

}
