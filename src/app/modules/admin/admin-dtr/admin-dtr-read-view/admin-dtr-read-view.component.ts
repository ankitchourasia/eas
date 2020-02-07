import { Component, OnInit } from '@angular/core';
import { AdminDtrMenuService } from '../admin-dtr-menu.service';

@Component({
  selector: 'eas-admin-dtr-read-view',
  templateUrl: './admin-dtr-read-view.component.html',
  styleUrls: ['./admin-dtr-read-view.component.css']
})
export class AdminDtrReadViewComponent implements OnInit {

  constructor(private adminDtrMenuService: AdminDtrMenuService) { 
    if(!this.adminDtrMenuService.SIXTH_MENU.active){
      this.adminDtrMenuService.menuClicked(this.adminDtrMenuService.SIXTH_MENU);
    }
  }

  ngOnInit() {
  }

}
