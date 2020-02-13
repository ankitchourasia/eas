import { Component, OnInit } from '@angular/core';
import { AdminFeeder11KVMenuService } from '../admin-feeder-11kv-menu.service';

@Component({
  selector: 'eas-admin-feeder-11kv-initial-read-add',
  templateUrl: './admin-feeder-11kv-initial-read-add.component.html',
  styleUrls: ['./admin-feeder-11kv-initial-read-add.component.css']
})
export class AdminFeeder11KVInitialReadAddComponent implements OnInit {

  constructor(private adminFeeder11KVMenuService: AdminFeeder11KVMenuService) { 
    if(!this.adminFeeder11KVMenuService.FOURTH_MENU.active){
      this.adminFeeder11KVMenuService.menuClicked(this.adminFeeder11KVMenuService.FOURTH_MENU);
    }
  }

  ngOnInit() {
  }

}
