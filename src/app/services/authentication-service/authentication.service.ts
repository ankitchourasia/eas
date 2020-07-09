import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly USER_DETAILS = "userDetails";
  private readonly TOKEN_KEY = "encodedCredentials";
  
  constructor() { }

  public createAuthorizationToken(user: any) : void {
    sessionStorage.setItem(this.TOKEN_KEY, btoa(user.username + ':' + user.password));
  }

  public setUserDetails(user: any){
    sessionStorage.setItem(this.USER_DETAILS, JSON.stringify(user));
  } 

  public getUserDetails(){
    return JSON.parse(sessionStorage.getItem(this.USER_DETAILS));
  }

  public getToken(): string {
    let currentToken = sessionStorage.getItem(this.TOKEN_KEY);
    return currentToken ? currentToken : "";
  }

  public clearSessionStorage(){
    this.clearStorage(this.TOKEN_KEY);
    this.clearStorage(this.USER_DETAILS);
  }

  public clearStorage(key: string) {
    sessionStorage.removeItem(key);
  }

}
