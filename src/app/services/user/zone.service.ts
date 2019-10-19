import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private URL_PREFIX = GlobalConfiguration.URL_PREFIX;
  private USER_URL = "user/";

  getUsers(response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.http.get(this.URL_PREFIX + this.USER_URL,  options);
    }else{
      return this.http.get(this.URL_PREFIX + this.USER_URL);
    }
  }

  addUser(User, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.http.post(this.URL_PREFIX + this.USER_URL, User,  options);
    }else{
      return this.http.post(this.URL_PREFIX + this.USER_URL, User);
    }
  }

  updateUser(User, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.http.put(this.URL_PREFIX + this.USER_URL, User,  options);
    }else{
      return this.http.put(this.URL_PREFIX + this.USER_URL, User);
    }
  }

}
