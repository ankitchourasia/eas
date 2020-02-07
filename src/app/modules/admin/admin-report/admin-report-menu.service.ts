import { Injectable } from '@angular/core';
import { MenuInterface } from 'app/interfaces/menu/menu.interface';

@Injectable()
export class AdminReportMenuService implements MenuInterface {
  
  public FIRST_MENU: any;
  private readonly FIRST_MENU_NAME: string = "Home";
  private readonly FIRST_MENU_LINK: string = "home";
  private readonly FIRST_MENU_ACTIVE: boolean = true;

  public SECOND_MENU: any;
  private readonly SECOND_MENU_NAME: string = "NSC Monitoring Input";
  private readonly SECOND_MENU_LINK: string = "nsc-monitoring";
  private readonly SECOND_MENU_ACTIVE: boolean = false;

  public THIRD_MENU: any;
  private readonly THIRD_MENU_NAME: string = "Consumer Complaints Redressal Input";
  private readonly THIRD_MENU_LINK: string = "consumer-complaints-redressal";
  private readonly THIRD_MENU_ACTIVE: boolean = false;

  public FOURTH_MENU: any;
  private readonly FOURTH_MENU_NAME: string = "Feeder JSON Report";
  private readonly FOURTH_MENU_LINK: string = "feeder/json";
  private readonly FOURTH_MENU_ACTIVE: boolean = false;

  public FIFTH_MENU: any;
  private readonly FIFTH_MENU_NAME: string = "D1 Report";
  private readonly FIFTH_MENU_LINK: string = "d1";
  private readonly FIFTH_MENU_ACTIVE: boolean = false;


  public SIXTH_MENU: any;
  private readonly SIXTH_MENU_NAME: string = "D2 Report";
  private readonly SIXTH_MENU_LINK: string = "d2";
  private readonly SIXTH_MENU_ACTIVE: boolean = false;

  public SEVENTH_MENU: any;
  private readonly SEVENTH_MENU_NAME: string = "D3 Report";
  private readonly SEVENTH_MENU_LINK: string = "d3";
  private readonly SEVENTH_MENU_ACTIVE: boolean = false;

  public EIGTH_MENU: any;
  private readonly EIGTH_MENU_NAME: string = "D4 Report";
  private readonly EIGTH_MENU_LINK: string = "d4";
  private readonly EIGTH_MENU_ACTIVE: boolean = false;

  public NINETH_MENU: any;
  private readonly NINETH_MENU_NAME: string = "D5 Report";
  private readonly NINETH_MENU_LINK: string = "d5";
  private readonly NINETH_MENU_ACTIVE: boolean = false;

  public TENTH_MENU: any;
  private readonly TENTH_MENU_NAME: string = "D6 Report";
  private readonly TENTH_MENU_LINK: string = "d6";
  private readonly TENTH_MENU_ACTIVE: boolean = false;

  public ELEVENTH_MENU: any;
  private readonly ELEVENTH_MENU_NAME: string = "D7 Report";
  private readonly ELEVENTH_MENU_LINK: string = "d7";
  private readonly ELEVENTH_MENU_ACTIVE: boolean = false;

  public LAST_MENU: any;
  private readonly LAST_MENU_NAME: string = "";
  private readonly LAST_MENU_LINK: string = "";
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

    this.SEVENTH_MENU = {
      name: this.SEVENTH_MENU_NAME,
      active: this.SEVENTH_MENU_ACTIVE,
      link: this.SEVENTH_MENU_LINK
    }

    this.EIGTH_MENU = {
      name: this.EIGTH_MENU_NAME,
      active: this.EIGTH_MENU_ACTIVE,
      link: this.EIGTH_MENU_LINK
    }
    this.NINETH_MENU = {
      name: this.NINETH_MENU_NAME,
      active: this.NINETH_MENU_ACTIVE,
      link: this.NINETH_MENU_LINK
    }
    this.TENTH_MENU = {
      name: this.TENTH_MENU_NAME,
      active: this.TENTH_MENU_ACTIVE,
      link: this.TENTH_MENU_LINK
    }
    this.ELEVENTH_MENU = {
      name: this.ELEVENTH_MENU_NAME,
      active: this.ELEVENTH_MENU_ACTIVE,
      link: this.ELEVENTH_MENU_LINK
    }

    this.LAST_MENU = {
      name: this.LAST_MENU_NAME,
      active: this.LAST_MENU_ACTIVE,
      link: this.LAST_MENU_LINK
    }

    this.menus.push(this.FIRST_MENU); 
    this.menus.push(this.SECOND_MENU);
    this.menus.push(this.THIRD_MENU); 
    this.menus.push(this.FOURTH_MENU);
    this.menus.push(this.FIFTH_MENU); 
    this.menus.push(this.SIXTH_MENU);
    this.menus.push(this.SEVENTH_MENU);
    this.menus.push(this.EIGTH_MENU);
    this.menus.push(this.NINETH_MENU);
    this.menus.push(this.TENTH_MENU);
    this.menus.push(this.ELEVENTH_MENU);
    // this.menus.push(this.LAST_MENU);  

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