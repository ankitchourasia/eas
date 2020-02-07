import { Component, OnInit } from '@angular/core';
import { AdminDtrMenuService } from '../admin-dtr-menu.service';

@Component({
  selector: 'eas-admin-dtr-view',
  templateUrl: './admin-dtr-view.component.html',
  styleUrls: ['./admin-dtr-view.component.css']
})
export class AdminDtrViewComponent implements OnInit {

  constructor(private adminDtrMenuService: AdminDtrMenuService) { 
    if(!this.adminDtrMenuService.THIRD_MENU.active){
      this.adminDtrMenuService.menuClicked(this.adminDtrMenuService.THIRD_MENU);
    }
  }

  ngOnInit() {
  }

}
