import { Component, OnInit } from '@angular/core';
import { AdminFeeder11KVMenuService } from '../admin-feeder-11kv-menu.service';

@Component({
  selector: 'eas-admin-feeder-11kv-tnd-loss-report-without-ht',
  templateUrl: './admin-feeder-11kv-tnd-loss-report-without-ht.component.html',
  styleUrls: ['./admin-feeder-11kv-tnd-loss-report-without-ht.component.css']
})
export class AdminFeeder11KVTndLossReportWithoutHtComponent implements OnInit {

  constructor(private adminFeeder11KVMenuService: AdminFeeder11KVMenuService) { 
    if(!this.adminFeeder11KVMenuService.TENTH_MENU.active){
      this.adminFeeder11KVMenuService.menuClicked(this.adminFeeder11KVMenuService.TENTH_MENU);
    }
  }

  ngOnInit() {
  }

}
