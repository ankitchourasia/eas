import { Component, OnInit } from '@angular/core';
import { AdminFeeder33KVMenuService } from '../admin-feeder-33kv-menu.service';

@Component({
  selector: 'eas-admin-feeder-33kv-export-point-add',
  templateUrl: './admin-feeder-33kv-export-point-add.component.html',
  styleUrls: ['./admin-feeder-33kv-export-point-add.component.css']
})
export class AdminFeeder33KVExportPointAddComponent implements OnInit {

  constructor(private adminFeeder33KVMenuService: AdminFeeder33KVMenuService) { 
    if(!this.adminFeeder33KVMenuService.SIXTH_MENU.active){
      this.adminFeeder33KVMenuService.menuClicked(this.adminFeeder33KVMenuService.SIXTH_MENU);
    }
  }

  ngOnInit() {
  }

}
