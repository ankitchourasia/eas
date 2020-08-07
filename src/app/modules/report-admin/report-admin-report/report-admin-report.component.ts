import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ReportAdminMenuService } from '../report-admin-menu.service';
import { ReportAdminReportMenuService } from './report-admin-report-menu.service';

@Component({
  selector: 'eas-report-admin-report',
  templateUrl: './report-admin-report.component.html',
  styleUrls: ['./report-admin-report.component.css']
})
export class ReportAdminReportComponent implements OnInit {

  menus : any[] = new Array();

  constructor(private route: ActivatedRoute, private router: Router, private adminMenuService : ReportAdminMenuService, 
    private adminReportMenuService: ReportAdminReportMenuService) {
      if(!this.adminMenuService.REPORT_MENU.active){
        this.adminMenuService.menuClicked(this.adminMenuService.REPORT_MENU);
      }
   }

  ngOnInit() {
    this.menus = this.adminReportMenuService.getMenus();
  }

  /**
   * event handler method for menu clicked on component page
  */
  public menuClicked(menu : any) : void {
    /**
       * making global configuration call to get the log prefix
    */
   if(menu) {
    menu.active = true;
    this.switchActive(menu);
    let navigationExtras: NavigationExtras = {
      relativeTo: this.route,
      // skipLocationChange: true
    };
    this.router.navigate([menu.link],navigationExtras);
  }
  }

   /**
   * Function to switch the active state among the
   * menus on the basis of clicked menu. The function sets
   * active property of all menu's to false except the passed
   * menu.
   */
  public switchActive(menu : any) : void {
      this.menus.forEach(element =>{
        if(element.name != menu.name) element.active = false;
      });
  }

}
