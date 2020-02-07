import { Injectable } from '@angular/core';
import { MenuInterface } from 'app/interfaces/menu/menu.interface';

@Injectable()
export class AdminSubstationMenuService implements MenuInterface {
  
  public FIRST_MENU: any;
  private readonly FIRST_MENU_NAME: string = "Home";
  private readonly FIRST_MENU_LINK: string = "home";
  private readonly FIRST_MENU_ACTIVE: boolean = true;

  public SECOND_MENU: any;
  private readonly SECOND_MENU_NAME: string = "Add";
  private readonly SECOND_MENU_LINK: string = "add";
  private readonly SECOND_MENU_ACTIVE: boolean = false;

  public LAST_MENU: any;
  private readonly LAST_MENU_NAME: string = "View";
  private readonly LAST_MENU_LINK: string = "view";
  private readonly LAST_MENU_ACTIVE: boolean = false;

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
    
    this.FIRST_MENU = {
      name: this.FIRST_MENU_NAME,
      active: this.FIRST_MENU_ACTIVE,
      link: this.FIRST_MENU_LINK
    };

    this.SECOND_MENU = {
      name: this.SECOND_MENU_NAME,
      active: this.SECOND_MENU_ACTIVE,
      link: this.SECOND_MENU_LINK
    }

    this.LAST_MENU = {
      name: this.LAST_MENU_NAME,
      active: this.LAST_MENU_ACTIVE,
      link: this.LAST_MENU_LINK
    }

    this.menus.push(this.FIRST_MENU); 
    this.menus.push(this.SECOND_MENU);
    this.menus.push(this.LAST_MENU);  

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