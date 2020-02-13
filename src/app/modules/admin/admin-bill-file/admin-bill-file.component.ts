import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AdminBillFileMenuService } from './admin-bill-file-menu.service';
import { AdminMenuService } from '../admin-menu.service';

@Component({
  selector: 'eas-admin-bill-file',
  templateUrl: './admin-bill-file.component.html',
  styleUrls: ['./admin-bill-file.component.css']
})
export class AdminBillFileComponent implements OnInit {

  menus : any[] = new Array();

  constructor(private route: ActivatedRoute, private router: Router, private adminMenuService : AdminMenuService, 
    private adminBillFileMenuService: AdminBillFileMenuService) {
      if(!this.adminMenuService.SIXTH_MENU.active){
        this.adminMenuService.menuClicked(this.adminMenuService.SIXTH_MENU);
      }
   }

  ngOnInit() {
    this.menus = this.adminBillFileMenuService.getMenus();
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
