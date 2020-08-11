import { Injectable } from '@angular/core';
import { MenuInterface } from 'app/interfaces/menu/menu.interface';

@Injectable()
export class TownAdminReportMenuService implements MenuInterface {
  
  public START_MENU: any;
  private readonly START_MENU_NAME: string = "Home";
  private readonly START_MENU_LINK: string = "home";
  private readonly START_MENU_ACTIVE: boolean = true;

  public D1_REPORT_MENU: any;
  private readonly D1_REPORT_MENU_NAME: string = "D1";
  private readonly D1_REPORT_MENU_LINK: string = "d1-report";
  private readonly D1_REPORT_MENU_ACTIVE: boolean = false;

 
  menus: any[] = new Array();

  constructor() {
    this.prepareMenus();
  }

  /**
   * Logic for creating menus dynamically on html page.
   * Also this logic is used to switch the active state on 
   * the basis of menu clicked
  */
  public prepareMenus(): void {
    this.START_MENU = {
      name: this.START_MENU_NAME,
      active: this.START_MENU_ACTIVE,
      link: this.START_MENU_LINK
    };
    this.menus.push(this.START_MENU);

    this.D1_REPORT_MENU = {
      name: this.D1_REPORT_MENU_NAME,
      active: this.D1_REPORT_MENU_ACTIVE,
      link: this.D1_REPORT_MENU_LINK
    };
    this.menus.push(this.D1_REPORT_MENU);
  }

  public getMenus() {
    return this.menus;
  }

  /**
   * event handler method for menu clicked on component page
  */
  public menuClicked(menu: any): void {
    if(menu) {
      menu.active = true;
      this.switchActive(menu);
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
}