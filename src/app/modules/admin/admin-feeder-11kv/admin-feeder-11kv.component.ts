import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AdminMenuService } from '../admin-menu.service';
import { AdminFeeder11KVMenuService } from './admin-feeder-11kv-menu.service';

@Component({
  selector: 'eas-admin-feeder-11kv',
  templateUrl: './admin-feeder-11kv.component.html',
  styleUrls: ['./admin-feeder-11kv.component.css']
})
export class AdminFeeder11KVComponent implements OnInit {

  menus : any[] = new Array();

  constructor(private route: ActivatedRoute, private router: Router, private adminMenuService : AdminMenuService, 
    private adminDtrMenuService: AdminFeeder11KVMenuService) {
      if(!this.adminMenuService.THIRD_MENU.active){
        this.adminMenuService.menuClicked(this.adminMenuService.THIRD_MENU);
      }
   }

  ngOnInit() {
    this.menus = this.adminDtrMenuService.getMenus();
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
