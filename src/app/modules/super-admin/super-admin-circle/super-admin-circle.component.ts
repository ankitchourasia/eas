import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { SuperAdminMenuService } from '../super-admin-menu.service';
import { SuperAdminCircleMenuService } from './super-admin-circle-menu.service';

@Component({
  selector: 'eas-super-admin-circle',
  templateUrl: './super-admin-circle.component.html',
  styleUrls: ['./super-admin-circle.component.css']
})
export class SuperAdminCircleComponent implements OnInit {

  menus : any[] = new Array();

  constructor(private route: ActivatedRoute, private router: Router, private superAdminMenuService : SuperAdminMenuService, 
    private superAdminCircleMenuService: SuperAdminCircleMenuService) {
      if(!this.superAdminMenuService.SECOND_MENU.active){
        this.superAdminMenuService.menuClicked(this.superAdminMenuService.SECOND_MENU);
      }
   }

  ngOnInit() {
    this.menus = this.superAdminCircleMenuService.getMenus();
  }

  /**
   * event handler method for menu clicked on component page
   */
  public menuClicked(menu : any) : void {
    /**
       * making global configuration call to get the log prefix
    **/
    if(menu) {
      menu.active = true;
      this.switchActive(menu);
      let navigationExtras: NavigationExtras = {
        relativeTo: this.route,
        skipLocationChange: true
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
