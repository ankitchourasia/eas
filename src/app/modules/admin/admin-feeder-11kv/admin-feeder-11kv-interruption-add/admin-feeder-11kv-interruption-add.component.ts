import { Component, OnInit } from '@angular/core';
import { AdminFeeder11KVMenuService } from '../admin-feeder-11kv-menu.service';

@Component({
  selector: 'eas-admin-feeder-11kv-interruption-add',
  templateUrl: './admin-feeder-11kv-interruption-add.component.html',
  styleUrls: ['./admin-feeder-11kv-interruption-add.component.css']
})
export class AdminFeeder11KVInterruptionAddComponent implements OnInit {

  constructor(private adminFeeder11KVMenuService: AdminFeeder11KVMenuService) { 
    if(!this.adminFeeder11KVMenuService.EIGTH_MENU.active){
      this.adminFeeder11KVMenuService.menuClicked(this.adminFeeder11KVMenuService.EIGTH_MENU);
    }
  }

  ngOnInit() {
  }

}
