import { Component, OnInit } from '@angular/core';
import { AdminFeeder33KVMenuService } from '../admin-feeder-33kv-menu.service';

@Component({
  selector: 'eas-admin-feeder-33kv-import-point-reading-add',
  templateUrl: './admin-feeder-33kv-import-point-reading-add.component.html',
  styleUrls: ['./admin-feeder-33kv-import-point-reading-add.component.css']
})
export class AdminFeeder33KVImportPointReadingAddComponent implements OnInit {

  constructor(private adminFeeder33KVMenuService: AdminFeeder33KVMenuService) { 
    if(!this.adminFeeder33KVMenuService.FIFTH_MENU.active){
      this.adminFeeder33KVMenuService.menuClicked(this.adminFeeder33KVMenuService.FIFTH_MENU);
    }
  }

  ngOnInit() {
  }

}
