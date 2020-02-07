import { Component, OnInit } from '@angular/core';
import { AdminSubstationMenuService } from '../admin-substation-menu.service';

@Component({
  selector: 'eas-admin-substation-home',
  templateUrl: './admin-substation-home.component.html',
  styleUrls: ['./admin-substation-home.component.css']
})
export class AdminSubstationHomeComponent implements OnInit {

  constructor(private adminSubstationMenuService: AdminSubstationMenuService) { 
    if(!this.adminSubstationMenuService.FIRST_MENU.active){
      this.adminSubstationMenuService.menuClicked(this.adminSubstationMenuService.FIRST_MENU);
    }
  }


  ngOnInit() {
  }

}
