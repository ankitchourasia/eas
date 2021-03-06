import { Component, OnInit } from '@angular/core';
import { AdminFeeder33KVMenuService } from '../admin-feeder-33kv-menu.service';

@Component({
  selector: 'eas-admin-feeder-33kv-export-point-read-view',
  templateUrl: './admin-feeder-33kv-export-point-read-view.component.html',
  styleUrls: ['./admin-feeder-33kv-export-point-read-view.component.css']
})
export class AdminFeeder33KVExportPointReadViewComponent implements OnInit {

  constructor(private adminFeeder33KVMenuService: AdminFeeder33KVMenuService) { 
    if(!this.adminFeeder33KVMenuService.ELEVENTH_MENU.active){
      this.adminFeeder33KVMenuService.menuClicked(this.adminFeeder33KVMenuService.ELEVENTH_MENU);
    }
  }

  ngOnInit() {
  }

}
