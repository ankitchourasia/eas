import { Component, OnInit } from '@angular/core';
import { AdminHTConsumerMenuService } from '../admin-ht-consumer-menu.service';

@Component({
  selector: 'eas-admin-ht-consumer-33kv-add',
  templateUrl: './admin-ht-consumer-33kv-add.component.html',
  styleUrls: ['./admin-ht-consumer-33kv-add.component.css']
})
export class AdminHTConsumer33KVAddComponent implements OnInit {

  constructor(private adminHTConsumerMenuService: AdminHTConsumerMenuService) { 
    if(!this.adminHTConsumerMenuService.SEVENTH_MENU.active){
      this.adminHTConsumerMenuService.menuClicked(this.adminHTConsumerMenuService.SEVENTH_MENU);
    }
  }

  ngOnInit() {
  }

}
