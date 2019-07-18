import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalConfiguration } from 'app/utility/global-configuration';

@Injectable({
  providedIn: 'root'
})
export class BillFileService {

  private URL_PREFIX = GlobalConfiguration.URL_PREFIX;
  private DTR_URL = "billfileref/";

  constructor(private http : HttpClient) { }

  checkBillFileUploadedByFeederGroupNoAndBillMonth(feederGroupNo, billMonth, response){
    // return this.http.get(this.URL_PREFIX + this.DTR_URL + 'reading/dtr/id/' + dtrId);
    let httpParams = new HttpParams();
    httpParams = httpParams.append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.http.get(this.URL_PREFIX + this.DTR_URL + 'groupNo/' + feederGroupNo,  options);
  }
}
