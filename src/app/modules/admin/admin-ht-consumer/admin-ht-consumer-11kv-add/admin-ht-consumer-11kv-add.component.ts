import { Component, OnInit } from '@angular/core';
import { AdminHTConsumerMenuService } from '../admin-ht-consumer-menu.service';

@Component({
  selector: 'eas-admin-ht-consumer-11kv-add',
  templateUrl: './admin-ht-consumer-11kv-add.component.html',
  styleUrls: ['./admin-ht-consumer-11kv-add.component.css']
})
export class AdminHTConsumer11KVAddComponent implements OnInit {

  constructor(private adminHTConsumerMenuService: AdminHTConsumerMenuService) { 
    if(!this.adminHTConsumerMenuService.SECOND_MENU.active){
      this.adminHTConsumerMenuService.menuClicked(this.adminHTConsumerMenuService.SECOND_MENU);
    }
  }

  ngOnInit() {
  }

}
