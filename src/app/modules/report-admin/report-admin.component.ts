import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { GlobalResources } from '@eas-utility/global.resources';
import { LazyLoadingScriptService } from '@eas-services/lazy-loading-script-service/lazy-loading-script.service';
import { ReportAdminMenuService } from './report-admin-menu.service';

@Component({
  selector: 'eas-report-admin',
  templateUrl: './report-admin.component.html',
  styleUrls: ['./report-admin.component.css']
})
export class ReportAdminComponent implements OnInit {

  user: any;
  menus : any[] = new Array();

  constructor(private route: ActivatedRoute,private router: Router, private adminMenuService: ReportAdminMenuService,
    public globalResources: GlobalResources, private lazyLoadingScriptService: LazyLoadingScriptService) {
  }

  ngOnInit() {
    this.lazyLoadingScriptService.loadScript('assets/js/external.js');
    this.user = this.globalResources.getUserDetails();
    this.menus = this.adminMenuService.menus;
  }

  /**
   * event handler method for menu clicked on component page
   */
  public menuClicked(menu: any): void {
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
  public switchActive(menu: any): void {
    this.menus.forEach(element => {
      if (element.name != menu.name) element.active = false;
    });
  }

  titleClicked(){
    let role = this.user.role.toLowerCase();
    this.router.navigate(['/' + role]);
  }

}
