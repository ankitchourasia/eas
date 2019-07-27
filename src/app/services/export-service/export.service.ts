import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalConfiguration } from 'app/utility/global-configuration';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  private URL_PREFIX = GlobalConfiguration.URL_PREFIX;
  private EXPORT_URL = "feederexportpoint/";

  constructor(private httpClient: HttpClient) { }

  add11KVExportPoint(exportPoint, punchBy, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("punchBy", punchBy);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.httpClient.post(this.URL_PREFIX + this.EXPORT_URL, exportPoint,  options);
  }

  getAll11KVExportPointsByZoneId(zoneId, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.EXPORT_URL + 'zone/' + zoneId,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.EXPORT_URL + 'zone/' + zoneId);
    }
  }

  statusChanged(exportPoint, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.put(this.URL_PREFIX + this.EXPORT_URL + 'changeStatus/', exportPoint,  options);
    }else{
      return this.httpClient.put(this.URL_PREFIX + this.EXPORT_URL + 'changeStatus/', exportPoint);
    }
  }
}
