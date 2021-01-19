import { Injectable } from '@angular/core';
import { MenuInterface } from 'app/interfaces/menu/menu.interface';

@Injectable()
export class AdminFeeder11KVMenuService  implements MenuInterface {

  public FIRST_MENU: any;
  private readonly FIRST_MENU_NAME: string = "Home";
  private readonly FIRST_MENU_LINK: string = "home";
  private readonly FIRST_MENU_ACTIVE: boolean = true;

  public SECOND_MENU: any;
  private readonly SECOND_MENU_NAME: string = "Feeder Add";
  private readonly SECOND_MENU_LINK: string = "add";
  private readonly SECOND_MENU_ACTIVE: boolean = false;

  public THIRD_MENU: any;
  private readonly THIRD_MENU_NAME: string = "Feeder View";
  private readonly THIRD_MENU_LINK: string = "view";
  private readonly THIRD_MENU_ACTIVE: boolean = false;

  public FOURTH_MENU: any;
  private readonly FOURTH_MENU_NAME: string = "Read Initial(S/R) Add";
  private readonly FOURTH_MENU_LINK: string = "read/add/initial";
  private readonly FOURTH_MENU_ACTIVE: boolean = false;

  public FIFTH_MENU: any;
  private readonly FIFTH_MENU_NAME: string = "Read Add";
  private readonly FIFTH_MENU_LINK: string = "read/add";
  private readonly FIFTH_MENU_ACTIVE: boolean = false;


  public SIXTH_MENU: any;
  private readonly SIXTH_MENU_NAME: string = "Read View";
  private readonly SIXTH_MENU_LINK: string = "read/view";
  private readonly SIXTH_MENU_ACTIVE: boolean = false;

  public SEVENTH_MENU: any;
  private readonly SEVENTH_MENU_NAME: string = "Read Absent View";
  private readonly SEVENTH_MENU_LINK: string = "read/view/absent";
  private readonly SEVENTH_MENU_ACTIVE: boolean = false;

  public EIGTH_MENU: any;
  private readonly EIGTH_MENU_NAME: string = "Interruption Add";
  private readonly EIGTH_MENU_LINK: string = "interruption/add";
  private readonly EIGTH_MENU_ACTIVE: boolean = false;

  public NINETH_MENU: any;
  private readonly NINETH_MENU_NAME: string = "Report T&D Loss";
  private readonly NINETH_MENU_LINK: string = "report/tnd-loss";
  private readonly NINETH_MENU_ACTIVE: boolean = false;

  public TENTH_MENU: any;
  private readonly TENTH_MENU_NAME: string = "Report T&D Loss (Without HT)";
  private readonly TENTH_MENU_LINK: string = "report/tnd-loss/without-ht";
  private readonly TENTH_MENU_ACTIVE: boolean = false;

  public ELEVENTH_MENU: any;
  private readonly ELEVENTH_MENU_NAME: string = "Report AT&C Loss";
  private readonly ELEVENTH_MENU_LINK: string = "report/atnc-loss";
  private readonly ELEVENTH_MENU_ACTIVE: boolean = false;

  public TWELFTH_MENU: any;
  private readonly TWELFTH_MENU_NAME: string = "Export Point Add";
  private readonly TWELFTH_MENU_LINK: string = "export-point/add";
  private readonly TWELFTH_MENU_ACTIVE: boolean = false;


  public THIRTEENTH_MENU: any;
  private readonly THIRTEENTH_MENU_NAME: string = "Export Point View";
  private readonly THIRTEENTH_MENU_LINK: string = "export-point/view";
  private readonly THIRTEENTH_MENU_ACTIVE: boolean = false;

  public FOURTEENTH_MENU: any;
  private readonly FOURTEENTH_MENU_NAME: string = "Export Point Read Add";
  private readonly FOURTEENTH_MENU_LINK: string = "export-point/read/add";
  private readonly FOURTEENTH_MENU_ACTIVE: boolean = false;

  public FIFTEENTH_MENU: any;
  private readonly FIFTEENTH_MENU_NAME: string = "Mapping Add";
  private readonly FIFTEENTH_MENU_LINK: string = "mapping/add";
  private readonly FIFTEENTH_MENU_ACTIVE: boolean = false;

  public SIXTEENTH_MENU: any;
  private readonly SIXTEENTH_MENU_NAME: string = "Export Point Absent Read";
  private readonly SIXTEENTH_MENU_LINK: string = "export-point-absent-read";
  private readonly SIXTEENTH_MENU_ACTIVE: boolean = false;

  public SEVENTEENTH_MENU: any;
  private readonly SEVENTEENTH_MENU_NAME: string = "Feeder Bill Data";
  private readonly SEVENTEENTH_MENU_LINK: string = "loss-data";
  private readonly SEVENTEENTH_MENU_ACTIVE: boolean = false;

  public EIGHTEENTH_MENU: any;
  private readonly EIGHTEENTH_MENU_NAME: string = "Feeder Loss";
  private readonly EIGHTEENTH_MENU_LINK: string = "loss-report";
  private readonly EIGHTEENTH_MENU_ACTIVE: boolean = false;

  public LAST_MENU: any;
  private readonly LAST_MENU_NAME: string = "Export Point Read View";
  private readonly LAST_MENU_LINK: string = "export-point/read/view";
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

    this.TWELFTH_MENU = {
      name: this.TWELFTH_MENU_NAME,
      active: this.TWELFTH_MENU_ACTIVE,
      link: this.TWELFTH_MENU_LINK
    }

    this.THIRTEENTH_MENU = {
      name: this.THIRTEENTH_MENU_NAME,
      active: this.THIRTEENTH_MENU_ACTIVE,
      link: this.THIRTEENTH_MENU_LINK
    }

    this.FOURTEENTH_MENU = {
      name: this.FOURTEENTH_MENU_NAME,
      active: this.FOURTEENTH_MENU_ACTIVE,
      link: this.FOURTEENTH_MENU_LINK
    }

    this.FIFTEENTH_MENU = {
      name: this.FIFTEENTH_MENU_NAME,
      active: this.FIFTEENTH_MENU_ACTIVE,
      link: this.FIFTEENTH_MENU_LINK
    }

    this.SIXTEENTH_MENU = {
      name: this.SIXTEENTH_MENU_NAME,
      active: this.SIXTEENTH_MENU_ACTIVE,
      link: this.SIXTEENTH_MENU_LINK
    }

    this.SEVENTEENTH_MENU = {
      name: this.SEVENTEENTH_MENU_NAME,
      active: this.SEVENTEENTH_MENU_ACTIVE,
      link: this.SEVENTEENTH_MENU_LINK
    }

    this.EIGHTEENTH_MENU = {
      name: this.EIGHTEENTH_MENU_NAME,
      active: this.EIGHTEENTH_MENU_ACTIVE,
      link: this.EIGHTEENTH_MENU_LINK
    }

    this.LAST_MENU = {
      name: this.LAST_MENU_NAME,
      active: this.LAST_MENU_ACTIVE,
      link: this.LAST_MENU_LINK
    }

    this.menus.push(this.FIRST_MENU); 
    this.menus.push(this.SECOND_MENU);
    this.menus.push(this.THIRD_MENU); 
    this.menus.push(this.FIFTEENTH_MENU);
    this.menus.push(this.EIGTH_MENU);
    this.menus.push(this.FOURTH_MENU);
    this.menus.push(this.FIFTH_MENU); 
    this.menus.push(this.SIXTH_MENU);
    this.menus.push(this.SEVENTH_MENU);
    this.menus.push(this.SEVENTEENTH_MENU);
    this.menus.push(this.EIGHTEENTH_MENU);
    this.menus.push(this.TWELFTH_MENU);
    this.menus.push(this.THIRTEENTH_MENU);
    this.menus.push(this.FOURTEENTH_MENU);
    this.menus.push(this.SIXTEENTH_MENU);
    this.menus.push(this.LAST_MENU);  
    // this.menus.push(this.ELEVENTH_MENU);
    // this.menus.push(this.NINETH_MENU);
    // this.menus.push(this.TENTH_MENU);
    
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