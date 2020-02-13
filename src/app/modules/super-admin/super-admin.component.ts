import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { SuperAdminMenuService } from './super-admin-menu.service';
import { GlobalResources } from '@eas-utility/global.resources';

@Component({
  selector: 'eas-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {

   
  user: any;
  menus : any[] = new Array();

  constructor(private route: ActivatedRoute,private router: Router, private superAdminMenuService: SuperAdminMenuService,
    public globalResources: GlobalResources) {
  }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
    this.menus = this.superAdminMenuService.menus;
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
  
  menuState:string = 'in';
  toggleMenu(){
    this.menuState = this.menuState === 'in' ? 'out' : 'in';
  }

  titleClicked(){
    let role = this.user.role.toLowerCase();
    this.router.navigate(['/' + role]);
  }

}
