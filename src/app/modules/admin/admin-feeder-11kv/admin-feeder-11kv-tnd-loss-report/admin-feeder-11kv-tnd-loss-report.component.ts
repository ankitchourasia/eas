import { Component, OnInit } from '@angular/core';
import { AdminFeeder11KVMenuService } from '../admin-feeder-11kv-menu.service';

@Component({
  selector: 'eas-admin-feeder-11kv-tnd-loss-report',
  templateUrl: './admin-feeder-11kv-tnd-loss-report.component.html',
  styleUrls: ['./admin-feeder-11kv-tnd-loss-report.component.css']
})
export class AdminFeeder11KVTndLossReportComponent implements OnInit {

  constructor(private adminFeeder11KVMenuService: AdminFeeder11KVMenuService) { 
    if(!this.adminFeeder11KVMenuService.NINETH_MENU.active){
      this.adminFeeder11KVMenuService.menuClicked(this.adminFeeder11KVMenuService.NINETH_MENU);
    }
  }

  ngOnInit() {
  }

}
