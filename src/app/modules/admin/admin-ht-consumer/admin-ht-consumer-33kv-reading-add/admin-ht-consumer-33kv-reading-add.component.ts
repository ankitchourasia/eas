import { Component, OnInit } from '@angular/core';
import { AdminHTConsumerMenuService } from '../admin-ht-consumer-menu.service';

@Component({
  selector: 'eas-admin-ht-consumer-33kv-reading-add',
  templateUrl: './admin-ht-consumer-33kv-reading-add.component.html',
  styleUrls: ['./admin-ht-consumer-33kv-reading-add.component.css']
})
export class AdminHTConsumer33KVReadingAddComponent implements OnInit {

  constructor(private adminHTConsumerMenuService: AdminHTConsumerMenuService) { 
    if(!this.adminHTConsumerMenuService.LAST_MENU.active){
      this.adminHTConsumerMenuService.menuClicked(this.adminHTConsumerMenuService.LAST_MENU);
    }
  }

  ngOnInit() {
  }

}
