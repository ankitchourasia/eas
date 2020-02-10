import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AdminMenuService } from '../admin-menu.service';
import { AdminHTConsumerMenuService } from './admin-ht-consumer-menu.service';

@Component({
  selector: 'eas-admin-ht-consumer',
  templateUrl: './admin-ht-consumer.component.html',
  styleUrls: ['./admin-ht-consumer.component.css']
})
export class AdminHTConsumerComponent implements OnInit {

  menus : any[] = new Array();

  constructor(private route: ActivatedRoute, private router: Router, private adminMenuService : AdminMenuService, 
    private adminHTConsumerMenuService: AdminHTConsumerMenuService) {
      if(!this.adminMenuService.FIFTH_MENU.active){
        this.adminMenuService.menuClicked(this.adminMenuService.FIFTH_MENU);
      }
   }

  ngOnInit() {
    this.menus = this.adminHTConsumerMenuService.getMenus();
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
