import { Component, OnInit } from '@angular/core';
import { AdminFeeder33KVMenuService } from '../admin-feeder-33kv-menu.service';

@Component({
  selector: 'eas-admin-feeder-33kv-home',
  templateUrl: './admin-feeder-33kv-home.component.html',
  styleUrls: ['./admin-feeder-33kv-home.component.css']
})
export class AdminFeeder33KVHomeComponent implements OnInit {

  constructor(private adminFeeder33KVMenuService: AdminFeeder33KVMenuService) { 
    if(!this.adminFeeder33KVMenuService.FIRST_MENU.active){
      this.adminFeeder33KVMenuService.menuClicked(this.adminFeeder33KVMenuService.FIRST_MENU);
    }
  }

  ngOnInit() {
  }

}
