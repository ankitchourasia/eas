import { Injectable } from '@angular/core';
import { MenuInterface } from 'app/interfaces/menu/menu.interface';

@Injectable()
export class AdminMenuService implements MenuInterface {
  
  public START_MENU: any;
  private readonly START_MENU_NAME: string = "Home";
  private readonly START_MENU_LINK: string = "home";
  private readonly START_MENU_ACTIVE: boolean = true;

  public FIRST_MENU: any;
  private readonly FIRST_MENU_NAME: string = "33/11KV Substation";
  private readonly FIRST_MENU_LINK: string = "substation";
  private readonly FIRST_MENU_ACTIVE: boolean = false;

  public SECOND_MENU: any;
  private readonly SECOND_MENU_NAME: string = "33KV Feeder";
  private readonly SECOND_MENU_LINK: string = "feeder/33kv";
  private readonly SECOND_MENU_ACTIVE: boolean = false;

  public THIRD_MENU: any;
  private readonly THIRD_MENU_NAME: string = "11KV Feeder";
  private readonly THIRD_MENU_LINK: string = "feeder/11kv";
  private readonly THIRD_MENU_ACTIVE: boolean = false;

  public FOURTH_MENU: any;
  private readonly FOURTH_MENU_NAME: string = "DTR";
  private readonly FOURTH_MENU_LINK: string = "dtr";
  private readonly FOURTH_MENU_ACTIVE: boolean = false;

  public FIFTH_MENU: any;
  private readonly FIFTH_MENU_NAME: string = "HT Consumer";
  private readonly FIFTH_MENU_LINK: string = "ht-consumer";
  private readonly FIFTH_MENU_ACTIVE: boolean = false;


  public SIXTH_MENU: any;
  private readonly SIXTH_MENU_NAME: string = "Bill File";
  private readonly SIXTH_MENU_LINK: string = "bill-file";
  private readonly SIXTH_MENU_ACTIVE: boolean = false;

  public LAST_MENU: any;
  private readonly LAST_MENU_NAME: string = "Reports";
  private readonly LAST_MENU_LINK: string = "report";
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
  
    this.FIFTH_MENU = {
      name: this.FIFTH_MENU_NAME,
      active: this.FIFTH_MENU_ACTIVE,
      link: this.FIFTH_MENU_LINK
    }

    this.SIXTH_MENU = {
      name: this.SIXTH_MENU_NAME,
      active: this.SIXTH_MENU_ACTIVE,
      link: this.SIXTH_MENU_LINK
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
    // this.menus.push(this.FOURTH_MENU);  //dtr
    this.menus.push(this.FIFTH_MENU);   //ht/consumer
    // this.menus.push(this.SIXTH_MENU);   //bill-file
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