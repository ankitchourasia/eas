import { Component, OnInit } from '@angular/core';
import { AdminHTConsumerMenuService } from '../admin-ht-consumer-menu.service';

@Component({
  selector: 'eas-admin-ht-consumer-11kv-view',
  templateUrl: './admin-ht-consumer-11kv-view.component.html',
  styleUrls: ['./admin-ht-consumer-11kv-view.component.css']
})
export class AdminHTConsumer11KVViewComponent implements OnInit {

  constructor(private adminHTConsumerMenuService: AdminHTConsumerMenuService) { 
    if(!this.adminHTConsumerMenuService.THIRD_MENU.active){
      this.adminHTConsumerMenuService.menuClicked(this.adminHTConsumerMenuService.THIRD_MENU);
    }
  }

  ngOnInit() {
  }

}
