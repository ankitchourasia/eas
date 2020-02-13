import { Component, OnInit } from '@angular/core';
import { AdminFeeder11KVMenuService } from '../admin-feeder-11kv-menu.service';

@Component({
  selector: 'eas-admin-feeder-11kv-read-view',
  templateUrl: './admin-feeder-11kv-read-view.component.html',
  styleUrls: ['./admin-feeder-11kv-read-view.component.css']
})
export class AdminFeeder11KVReadViewComponent implements OnInit {

  constructor(private adminFeeder11KVMenuService: AdminFeeder11KVMenuService) { 
    if(!this.adminFeeder11KVMenuService.SIXTH_MENU.active){
      this.adminFeeder11KVMenuService.menuClicked(this.adminFeeder11KVMenuService.SIXTH_MENU);
    }
  }

  ngOnInit() {
  }

}
