import { Component, OnInit } from '@angular/core';
import { AdminFeeder11KVMenuService } from '../admin-feeder-11kv-menu.service';

@Component({
  selector: 'eas-admin-feeder-11kv-home',
  templateUrl: './admin-feeder-11kv-home.component.html',
  styleUrls: ['./admin-feeder-11kv-home.component.css']
})
export class AdminFeeder11KVHomeComponent implements OnInit {

  constructor(private adminFeeder11KVMenuService: AdminFeeder11KVMenuService) { 
    if(!this.adminFeeder11KVMenuService.FIRST_MENU.active){
      this.adminFeeder11KVMenuService.menuClicked(this.adminFeeder11KVMenuService.FIRST_MENU);
    }
  }

  ngOnInit() {
  }

}
