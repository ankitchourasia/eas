import { Component, OnInit } from '@angular/core';
import { AdminHTConsumerMenuService } from '../admin-ht-consumer-menu.service';

@Component({
  selector: 'eas-admin-ht-consumer-11kv-reading-add',
  templateUrl: './admin-ht-consumer-11kv-reading-add.component.html',
  styleUrls: ['./admin-ht-consumer-11kv-reading-add.component.css']
})
export class AdminHTConsumer11KVReadingAddComponent implements OnInit {

  constructor(private adminHTConsumerMenuService: AdminHTConsumerMenuService) { 
    if(!this.adminHTConsumerMenuService.FOURTH_MENU.active){
      this.adminHTConsumerMenuService.menuClicked(this.adminHTConsumerMenuService.FOURTH_MENU);
    }
  }

  ngOnInit() {
  }

}
