import { Component, OnInit } from '@angular/core';
import { AdminHTConsumerMenuService } from '../admin-ht-consumer-menu.service';

@Component({
  selector: 'eas-admin-ht-consumer-33kv-view',
  templateUrl: './admin-ht-consumer-33kv-view.component.html',
  styleUrls: ['./admin-ht-consumer-33kv-view.component.css']
})
export class AdminHTConsumer33KVViewComponent implements OnInit {

  constructor(private adminHTConsumerMenuService: AdminHTConsumerMenuService) { 
    if(!this.adminHTConsumerMenuService.EIGHT_MENU.active){
      this.adminHTConsumerMenuService.menuClicked(this.adminHTConsumerMenuService.EIGHT_MENU);
    }
  }

  ngOnInit() {
  }

}
