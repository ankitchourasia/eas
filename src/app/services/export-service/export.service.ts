import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConfiguration } from 'app/utility/global-configuration';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  private URL_PREFIX = GlobalConfiguration.URL_PREFIX;
  private EXPORT_URL = "feederexportpoint/";

  constructor(private httpClient: HttpClient) { }

  add11KVExportPoint(exportPoint, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.post(this.URL_PREFIX + this.EXPORT_URL, exportPoint,  options);
    }else{
      return this.httpClient.post(this.URL_PREFIX + this.EXPORT_URL, exportPoint);
    }
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
