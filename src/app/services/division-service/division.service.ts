import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'app/utility/global.constants';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  private URL_PREFIX = GlobalConstants.URL_PREFIX;

  constructor(private http : HttpClient) { }

  getDivisionsByCircleId(circleId,response){
    // return this.http.get(this.URL_PREFIX + 'circle/');
    if(response){
      let options : any = {'observe' : 'response'};
      return this.http.get(this.URL_PREFIX + 'division/circle/id/' + circleId,  options);
    }else{
      return this.http.get(this.URL_PREFIX + 'division/circle/id/' + circleId);
    }
  }
}
