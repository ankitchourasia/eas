import { Component, OnInit } from '@angular/core';
import { AdminDtrMenuService } from '../admin-dtr-menu.service';

@Component({
  selector: 'eas-admin-dtr-loss-report',
  templateUrl: './admin-dtr-loss-report.component.html',
  styleUrls: ['./admin-dtr-loss-report.component.css']
})
export class AdminDtrLossReportComponent implements OnInit {

  constructor(private adminDtrMenuService: AdminDtrMenuService) { 
    if(!this.adminDtrMenuService.SEVENTH_MENU.active){
      this.adminDtrMenuService.menuClicked(this.adminDtrMenuService.SEVENTH_MENU);
    }
  }

  ngOnInit() {
  }

}
