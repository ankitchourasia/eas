import { Component, OnInit } from '@angular/core';
import { AdminDtrMenuService } from '../admin-dtr-menu.service';

@Component({
  selector: 'eas-admin-dtr-home',
  templateUrl: './admin-dtr-home.component.html',
  styleUrls: ['./admin-dtr-home.component.css']
})
export class AdminDtrHomeComponent implements OnInit {

  constructor(private adminDtrMenuService: AdminDtrMenuService) { 
    if(!this.adminDtrMenuService.FIRST_MENU.active){
      this.adminDtrMenuService.menuClicked(this.adminDtrMenuService.FIRST_MENU);
    }
  }

  ngOnInit() {
  }

}
