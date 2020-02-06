import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminBillFileMenuService } from './admin-bill-file-menu.service';
import { AdminMenuService } from '../admin-menu.service';

@Component({
  selector: 'eas-admin-bill-file',
  templateUrl: './admin-bill-file.component.html',
  styleUrls: ['./admin-bill-file.component.css']
})
export class AdminBillFileComponent implements OnInit {

  menus : any[] = new Array();

  constructor(private route: ActivatedRoute, private router: Router, private oicMenuService : AdminMenuService, 
    private adminBillFileMenuService: AdminBillFileMenuService) {
      if(!this.oicMenuService.SIXTH_MENU.active){
        this.oicMenuService.menuClicked(this.oicMenuService.SIXTH_MENU);
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
