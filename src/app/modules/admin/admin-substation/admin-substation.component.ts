import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AdminMenuService } from '../admin-menu.service';
import { AdminSubstationMenuService } from './admin-substation-menu.service';
import { AnimateService } from 'app/animations/animation.service';
import { showHideAnimate, sidebarAnimate } from 'app/animations/animation';

@Component({
  selector: 'eas-admin-substation',
  templateUrl: './admin-substation.component.html',
  styleUrls: ['./admin-substation.component.css'],
  animations: [showHideAnimate, sidebarAnimate]
})
export class AdminSubstationComponent implements OnInit {

  menus : any[] = new Array();

  constructor(private route: ActivatedRoute, private router: Router, private adminMenuService : AdminMenuService, 
    private adminSubstationMenuService: AdminSubstationMenuService, public animateService: AnimateService) {
      if(!this.adminMenuService.FIRST_MENU.active){
        this.adminMenuService.menuClicked(this.adminMenuService.FIRST_MENU);
      }
   }

  ngOnInit() {
    this.menus = this.adminSubstationMenuService.getMenus();
    // this.onSinenavToggle();
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

  sideNavState: boolean;
  linkText: boolean;
  onSinenavToggle() {
    this.sideNavState = !this.sideNavState;
    this.linkText = this.sideNavState;
    this.animateService.sidebarAnimeState$.next(this.sideNavState)
  }

}
