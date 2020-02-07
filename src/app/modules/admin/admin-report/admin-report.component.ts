import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminMenuService } from '../admin-menu.service';
import { AdminReportMenuService } from './admin-report-menu.service';

@Component({
  selector: 'eas-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.css']
})
export class AdminReportComponent implements OnInit {

  menus : any[] = new Array();

  constructor(private route: ActivatedRoute, private router: Router, private adminMenuService : AdminMenuService, 
    private adminReportMenuService: AdminReportMenuService) {
      if(!this.adminMenuService.LAST_MENU.active){
        this.adminMenuService.menuClicked(this.adminMenuService.LAST_MENU);
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
    if(menu){
      menu.active = true;
      this.switchActive(menu);
      this.router.navigate([menu.link],{relativeTo: this.route});
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
