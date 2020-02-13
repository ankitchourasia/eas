import { Component, OnInit } from '@angular/core';
import { AdminHTConsumerMenuService } from '../admin-ht-consumer-menu.service';

@Component({
  selector: 'eas-admin-ht-consumer-11kv-reading-view',
  templateUrl: './admin-ht-consumer-11kv-reading-view.component.html',
  styleUrls: ['./admin-ht-consumer-11kv-reading-view.component.css']
})
export class AdminHTConsumer11KVReadingViewComponent implements OnInit {

  constructor(private adminHTConsumerMenuService: AdminHTConsumerMenuService) { 
    if(!this.adminHTConsumerMenuService.FIFTH_MENU.active){
      this.adminHTConsumerMenuService.menuClicked(this.adminHTConsumerMenuService.FIFTH_MENU);
    }
  }

  ngOnInit() {
  }

}
