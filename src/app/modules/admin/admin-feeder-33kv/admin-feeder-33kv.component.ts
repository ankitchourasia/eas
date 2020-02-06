import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminMenuService } from '../admin-menu.service';
import { AdminFeeder33KVMenuService } from './admin-feeder-33kv-menu.service';

@Component({
  selector: 'eas-admin-feeder-33kv',
  templateUrl: './admin-feeder-33kv.component.html',
  styleUrls: ['./admin-feeder-33kv.component.css']
})
export class AdminFeeder33KVComponent implements OnInit {

  menus : any[] = new Array();

  constructor(private route: ActivatedRoute, private router: Router, private oicMenuService : AdminMenuService, 
    private adminDtrMenuService: AdminFeeder33KVMenuService) {
      if(!this.oicMenuService.SECOND_MENU.active){
        this.oicMenuService.menuClicked(this.oicMenuService.SECOND_MENU);
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
