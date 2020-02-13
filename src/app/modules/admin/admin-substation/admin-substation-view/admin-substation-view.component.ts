import { Component, OnInit } from '@angular/core';
import { AdminSubstationMenuService } from '../admin-substation-menu.service';

@Component({
  selector: 'eas-admin-substation-view',
  templateUrl: './admin-substation-view.component.html',
  styleUrls: ['./admin-substation-view.component.css']
})
export class AdminSubstationViewComponent implements OnInit {

  constructor(private adminSubstationMenuService: AdminSubstationMenuService) { 
    if(!this.adminSubstationMenuService.LAST_MENU.active){
      this.adminSubstationMenuService.menuClicked(this.adminSubstationMenuService.LAST_MENU);
    }
  }

  ngOnInit() {
  }

}
