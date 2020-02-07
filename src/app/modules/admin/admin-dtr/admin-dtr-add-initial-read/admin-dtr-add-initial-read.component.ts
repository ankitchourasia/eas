import { Component, OnInit } from '@angular/core';
import { AdminDtrMenuService } from '../admin-dtr-menu.service';

@Component({
  selector: 'eas-admin-dtr-add-initial-read',
  templateUrl: './admin-dtr-add-initial-read.component.html',
  styleUrls: ['./admin-dtr-add-initial-read.component.css']
})
export class AdminDtrAddInitialReadComponent implements OnInit {

  constructor(private adminDtrMenuService: AdminDtrMenuService) { 
    if(!this.adminDtrMenuService.FOURTH_MENU.active){
      this.adminDtrMenuService.menuClicked(this.adminDtrMenuService.FOURTH_MENU);
    }
  }

  ngOnInit() {
  }

}
