import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

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

  getExportPointFeedersBySubstationId(substationId, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.EXPORT_URL + 'substation/' + substationId,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.EXPORT_URL + 'substation/' + substationId);
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

  getEXportPointListByFeederId(feederId, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.EXPORT_URL + 'export11kv/' + feederId,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.EXPORT_URL + 'export11kv/' + feederId);
    }
  }

  getAll11KVExportPointReadingsByZoneIdAndBillMonth(zoneId, billMonth, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.httpClient.get(this.URL_PREFIX + this.EXPORT_URL + 'reading/zone/' + zoneId,  options);
  }

  add11KVExportPointReading(exportPointReading, username, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("punchedBy", username);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.httpClient.post(this.URL_PREFIX + this.EXPORT_URL + 'reading/', exportPointReading, options);
  }

  add11KVExportPointReadingWithMeterReplacement(exportPointReading, username, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("punchedBy", username);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.httpClient.post(this.URL_PREFIX + this.EXPORT_URL + 'meter/replacement/', exportPointReading, options);
  }

  update11KVExportPointReading(exportPointReading, nextBillMonth, username, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("nextBillMonth", nextBillMonth);
    httpParams = httpParams.append("updatedBy", username);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.httpClient.put(this.URL_PREFIX + this.EXPORT_URL + 'reading/' + exportPointReading.id, exportPointReading, options);
  }

  statusChanged(exportPoint, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.put(this.URL_PREFIX + this.EXPORT_URL + 'changeStatus/', exportPoint,  options);
    }else{
      return this.httpClient.put(this.URL_PREFIX + this.EXPORT_URL + 'changeStatus/', exportPoint);
    }
  }

  getLastInsertedReadingByExportLocationNameIdAndMeterNo(exportLocationNameId, meterNo, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("meterNo", meterNo);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.httpClient.get(this.URL_PREFIX + this.EXPORT_URL + 'reading/last-inserted/' + exportLocationNameId,  options);
  }
}
