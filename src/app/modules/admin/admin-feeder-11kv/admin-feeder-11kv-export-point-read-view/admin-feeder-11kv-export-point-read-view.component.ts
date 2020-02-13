import { Component, OnInit } from '@angular/core';
import { AdminFeeder11KVMenuService } from '../admin-feeder-11kv-menu.service';

@Component({
  selector: 'eas-admin-feeder-11kv-export-point-read-view',
  templateUrl: './admin-feeder-11kv-export-point-read-view.component.html',
  styleUrls: ['./admin-feeder-11kv-export-point-read-view.component.css']
})
export class AdminFeeder11KVExportPointReadViewComponent implements OnInit {

  constructor(private adminFeeder11KVMenuService: AdminFeeder11KVMenuService) { 
    if(!this.adminFeeder11KVMenuService.LAST_MENU.active){
      this.adminFeeder11KVMenuService.menuClicked(this.adminFeeder11KVMenuService.LAST_MENU);
    }
  }

  ngOnInit() {
  }

}
