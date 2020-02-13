import { Component, OnInit } from '@angular/core';
import { AdminSubstationMenuService } from '../admin-substation-menu.service';

@Component({
  selector: 'eas-admin-substation-add',
  templateUrl: './admin-substation-add.component.html',
  styleUrls: ['./admin-substation-add.component.css']
})
export class AdminSubstationAddComponent implements OnInit {

  constructor(private adminSubstationMenuService: AdminSubstationMenuService) { 
    if(!this.adminSubstationMenuService.SECOND_MENU.active){
      this.adminSubstationMenuService.menuClicked(this.adminSubstationMenuService.SECOND_MENU);
    }
  }


  ngOnInit() {
  }

}
