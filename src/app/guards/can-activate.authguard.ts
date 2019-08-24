import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from "@angular/router";
import { Observable } from "rxjs";
import { GlobalResources } from "@eas-utility/global.resources";

@Injectable()
export class CanActivateAuthGuard implements CanActivate,CanActivateChild{
    
    constructor(private router: Router,private globalResources: GlobalResources){

    }

    public canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) : boolean{
        const expectedRoles : [any] = route.data.expectedRoles;
        if(this.globalResources.getUserDetails() && expectedRoles){
            let loggedInUserRole = this.globalResources.getUserDetails().role;
            let matchedRole = expectedRoles.find(role => role === loggedInUserRole);
            if(matchedRole){
                return true;
            }else{
                this.router.navigate(['/login']);
                return false;
            }
        }
        this.router.navigate(['/login']);
        return false;
    }

    public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.canActivate(childRoute,state);
    }
}