import { Injectable } from '@angular/core';
import { MenuInterface } from 'app/interfaces/menu/menu.interface';

@Injectable()
export class SuperAdminMenuService implements MenuInterface {
  
  public START_MENU: any;
  private readonly START_MENU_NAME: string = "Home";
  private readonly START_MENU_LINK: string = "home";
  private readonly START_MENU_ACTIVE: boolean = true;

  public FIRST_MENU: any;
  private readonly FIRST_MENU_NAME: string = "Region";
  private readonly FIRST_MENU_LINK: string = "region";
  private readonly FIRST_MENU_ACTIVE: boolean = false;

  public SECOND_MENU: any;
  private readonly SECOND_MENU_NAME: string = "Circle";
  private readonly SECOND_MENU_LINK: string = "circle";
  private readonly SECOND_MENU_ACTIVE: boolean = false;

  public THIRD_MENU: any;
  private readonly THIRD_MENU_NAME: string = "Division";
  private readonly THIRD_MENU_LINK: string = "division";
  private readonly THIRD_MENU_ACTIVE: boolean = false;

  public FOURTH_MENU: any;
  private readonly FOURTH_MENU_NAME: string = "Zone";
  private readonly FOURTH_MENU_LINK: string = "zone";
  private readonly FOURTH_MENU_ACTIVE: boolean = false;

  public LAST_MENU: any;
  private readonly LAST_MENU_NAME: string = "User";
  private readonly LAST_MENU_LINK: string = "user";
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
    this.START_MENU = {
      name: this.START_MENU_NAME,
      active: this.START_MENU_ACTIVE,
      link: this.START_MENU_LINK
    };
    
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

    this.THIRD_MENU = {
      name: this.THIRD_MENU_NAME,
      active: this.THIRD_MENU_ACTIVE,
      link: this.THIRD_MENU_LINK
    }

    this.FOURTH_MENU = {
      name: this.FOURTH_MENU_NAME,
      active: this.FOURTH_MENU_ACTIVE,
      link: this.FOURTH_MENU_LINK
    }

    this.LAST_MENU = {
      name: this.LAST_MENU_NAME,
      active: this.LAST_MENU_ACTIVE,
      link: this.LAST_MENU_LINK
    }

    this.menus.push(this.START_MENU);   //home
    this.menus.push(this.FIRST_MENU);   //substation
    this.menus.push(this.SECOND_MENU);  //feeder/33kv
    this.menus.push(this.THIRD_MENU);   //feeder/11kv
    this.menus.push(this.FOURTH_MENU);  //dtr
    this.menus.push(this.LAST_MENU);    //report
    
    
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