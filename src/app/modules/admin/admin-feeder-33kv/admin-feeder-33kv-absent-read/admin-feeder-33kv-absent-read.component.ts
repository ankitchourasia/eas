import { Component, OnInit } from '@angular/core';
import { AdminFeeder33KVMenuService } from '../admin-feeder-33kv-menu.service';

@Component({
  selector: 'eas-admin-feeder-33kv-absent-read',
  templateUrl: './admin-feeder-33kv-absent-read.component.html',
  styleUrls: ['./admin-feeder-33kv-absent-read.component.css']
})
export class AdminFeeder33KVAbsentReadComponent implements OnInit {

  constructor(private adminFeeder33KVMenuService: AdminFeeder33KVMenuService) { 
    if(!this.adminFeeder33KVMenuService.TWELVETH_MENU.active){
      this.adminFeeder33KVMenuService.menuClicked(this.adminFeeder33KVMenuService.TWELVETH_MENU);
    }
  }

  ngOnInit() {
  }

}
