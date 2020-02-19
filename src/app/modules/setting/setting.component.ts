import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingMenuService } from './setting-menu.service';
import { GlobalResources } from '@eas-utility/global.resources';
import { LazyLoadingScriptService } from '@eas-services/lazy-loading-script-service/lazy-loading-script.service';

@Component({
  selector: 'eas-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  user: any;
  public sourceUrl : string;
  public menus : any[] = new Array();
  constructor(private route: ActivatedRoute, private router: Router, private settingMenuService: SettingMenuService,
    public globalResources: GlobalResources, private lazyLoadingScriptService: LazyLoadingScriptService) {
    }
  
  ngOnInit() {
    this.lazyLoadingScriptService.loadScript('assets/js/external.js');
    this.user = this.globalResources.getUserDetails();
    this.menus = this.settingMenuService.getMenus();
    this.route.queryParams.subscribe(params => {
      this.sourceUrl = params['source'];
    });
  }

  public backClicked() : void {
    this.router.navigate([this.sourceUrl]);
  }

  public menuClicked(menu : any) : void{
    let methodName : string = "menuClicked() : ";
    /**
     * making global configuration call to get the log prefix
     */
    // let logPrefix : string = this.globalConfiguration.getLogPrefix(this.componentName,methodName);
    // console.log(logPrefix + "clicked");
    if(menu != null){
        menu.active = true;
        this.switchActive(menu);
        console.log("Navigating to " + menu.name + " with relative to config");
        this.router.navigate([menu.link],{relativeTo: this.route,queryParamsHandling: "merge"});
    }
  }

  public switchActive(menu : any) : void{
      this.menus.forEach(element =>{
          if(element.name != menu.name) element.active = false;
      });
  }

  titleClicked(){
    let role = this.user.role.toLowerCase();
    this.router.navigate(['/' + role]);
  }

}
