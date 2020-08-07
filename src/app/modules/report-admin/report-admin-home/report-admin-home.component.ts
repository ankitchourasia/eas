import { Component, OnInit } from '@angular/core';
import { ReportAdminMenuService } from '../report-admin-menu.service';

@Component({
  selector: 'eas-report-admin-home',
  templateUrl: './report-admin-home.component.html',
  styleUrls: ['./report-admin-home.component.css']
})
export class ReportAdminHomeComponent implements OnInit {

  constructor(private adminMenuService: ReportAdminMenuService) {
    if (!this.adminMenuService.START_MENU.active) {
      this.adminMenuService.menuClicked(this.adminMenuService.START_MENU);
    }
  }

  ngOnInit(): void {
  }

}
