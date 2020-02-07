import { Component, OnInit } from '@angular/core';
import { AdminDtrMenuService } from '../admin-dtr-menu.service';

@Component({
  selector: 'eas-admin-dtr-read-add',
  templateUrl: './admin-dtr-read-add.component.html',
  styleUrls: ['./admin-dtr-read-add.component.css']
})
export class AdminDtrReadAddComponent implements OnInit {

  constructor(private adminDtrMenuService: AdminDtrMenuService) { 
    if(!this.adminDtrMenuService.FIFTH_MENU.active){
      this.adminDtrMenuService.menuClicked(this.adminDtrMenuService.FIFTH_MENU);
    }
  }

  ngOnInit() {
  }

}
