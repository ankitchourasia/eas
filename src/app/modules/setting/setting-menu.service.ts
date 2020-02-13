import { Injectable } from "@angular/core";

@Injectable()
export class SettingMenuService {
    public readonly CLASS_NAME : string = "SettingMenuService ";

    public FIRST_MENU : any ;
    private readonly FIRST_MENU_NAME: string = "Home";
    private readonly FIRST_MENU_LINK: string = "home";
    private readonly FIRST_MENU_ACTIVE: boolean = false;

    public SECOND_MENU : any;
    private readonly SECOND_MENU_NAME : string = "Update Profile";
    private readonly SECOND_MENU_LINK : string = "profile/update";
    private readonly SECOND_MENU_ACTIVE : boolean = false;
    
    public THIRD_MENU : any;
    private readonly THIRD_MENU_NAME : string = "Update Password";
    private readonly THIRD_MENU_LINK : string = "password/update";
    private readonly THIRD_MENU_ACTIVE : boolean = false;

    menus: any[] = new Array();

    constructor(){
        this.prepareMenus();
    }

    public prepareMenus(): void {
        //console.log(this.CLASS_NAME + "Preparing Menus for OAG");
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

        this.menus.push(this.FIRST_MENU);
        this.menus.push(this.SECOND_MENU);
        this.menus.push(this.THIRD_MENU);
    }

    public getMenus() {
        return this.menus;
    }

  public menuClicked(menu : any) : void {
    if(menu){
        menu.active = true;
        this.switchActive(menu);
    }
  }

  public switchActive(menu : any) : void {
      this.menus.forEach(element =>{
          if(element.name != menu.name) element.active = false;
      });
  }
}