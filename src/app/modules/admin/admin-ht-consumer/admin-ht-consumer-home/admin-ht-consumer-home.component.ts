import { Component, OnInit } from '@angular/core';
import { AdminHTConsumerMenuService } from '../admin-ht-consumer-menu.service';

@Component({
  selector: 'eas-admin-ht-consumer-home',
  templateUrl: './admin-ht-consumer-home.component.html',
  styleUrls: ['./admin-ht-consumer-home.component.css']
})
export class AdminHTConsumerHomeComponent implements OnInit {

  constructor(private adminHTConsumerMenuService: AdminHTConsumerMenuService) { 
    if(!this.adminHTConsumerMenuService.FIRST_MENU.active){
      this.adminHTConsumerMenuService.menuClicked(this.adminHTConsumerMenuService.FIRST_MENU);
    }
  }

  ngOnInit() {
  }

}
