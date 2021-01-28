import { Component, OnInit } from '@angular/core';
import { AdminHTConsumerMenuService } from '../admin-ht-consumer-menu.service';

@Component({
  selector: 'eas-admin-ht-consumer-33kv-reading-view-absent',
  templateUrl: './admin-ht-consumer-33kv-reading-view-absent.component.html',
  styleUrls: ['./admin-ht-consumer-33kv-reading-view-absent.component.css']
})
export class AdminHTConsumer33KVReadingViewAbsentComponent implements OnInit {

  constructor(private adminHTConsumerMenuService: AdminHTConsumerMenuService) { 
    if(!this.adminHTConsumerMenuService.ELEVENTH_MENU.active){
      this.adminHTConsumerMenuService.menuClicked(this.adminHTConsumerMenuService.ELEVENTH_MENU);
    }
  }

  ngOnInit() {
  }

}
