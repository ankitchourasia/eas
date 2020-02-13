import { Injectable } from '@angular/core';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  private URL_PREFIX = GlobalConfiguration.URL_PREFIX;
  private IMPORT_URL = "feederimportpoint/";

  constructor(private httpClient: HttpClient) { }

  add11KVImportPoint(importPoint, punchBy, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("punchBy", punchBy);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.httpClient.post(this.URL_PREFIX + this.IMPORT_URL, importPoint,  options);
  }

  getImportPointFeedersBySubstationId(substationId, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.IMPORT_URL + 'substation/' + substationId,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.IMPORT_URL + 'substation/' + substationId);
    }
  }

  getAll11KVImportPointsByZoneId(zoneId, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.IMPORT_URL + 'zone/' + zoneId,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.IMPORT_URL + 'zone/' + zoneId);
    }
  }

  getImportPointListByFeederId(feederId, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.IMPORT_URL + 'import11kv/' + feederId,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.IMPORT_URL + 'import11kv/' + feederId);
    }
  }

  getAll11KVImportPointReadingsByZoneIdAndBillMonth(zoneId, billMonth, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.httpClient.get(this.URL_PREFIX + this.IMPORT_URL + 'reading/zone/' + zoneId,  options);
  }

  add11KVImportPointReading(importPointReading, username, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("punchedBy", username);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.httpClient.post(this.URL_PREFIX + this.IMPORT_URL + 'reading/', importPointReading, options);
  }

  add11KVImportPointReadingWithMeterReplacement(importPointReading, username, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("punchedBy", username);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.httpClient.post(this.URL_PREFIX + this.IMPORT_URL + 'meter/replacement/', importPointReading, options);
  }

  update11KVImportPointReading(importPointReading, nextBillMonth, username, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("nextBillMonth", nextBillMonth);
    httpParams = httpParams.append("updatedBy", username);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.httpClient.put(this.URL_PREFIX + this.IMPORT_URL + 'reading/' + importPointReading.id, importPointReading, options);
  }

  statusChanged(importPoint, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.put(this.URL_PREFIX + this.IMPORT_URL + 'changeStatus/', importPoint,  options);
    }else{
      return this.httpClient.put(this.URL_PREFIX + this.IMPORT_URL + 'changeStatus/', importPoint);
    }
  }

  getLastInsertedReadingByImportLocationNameIdAndMeterNo(importLocationNameId, meterNo, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("meterNo", meterNo);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.httpClient.get(this.URL_PREFIX + this.IMPORT_URL + 'reading/last-inserted/' + importLocationNameId,  options);
  }

  add33KVImportPoint(importPoint, response){
    if(response){
      let options : any = {observe : 'response'};
      return this.httpClient.post(this.URL_PREFIX + 'import-33kv/', importPoint,  options);
    }else{
      return this.httpClient.post(this.URL_PREFIX + 'import-33kv/', importPoint);
    }
  }

  getImportPointListBy33KVFeederId(feederId, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + 'import-33kv/feeder-33kv/' + feederId,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + 'import-33kv/feeder-33kv/' + feederId);
    }
  }

    
  getPreviousReadingBy33KVImportPointId(importPointId, response){
    if(response){
      let options : any = {observe : 'response'};
      return this.httpClient.get(this.URL_PREFIX + 'import-33kv/reading/last-inserted/import-33kv/' + importPointId,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + 'import-33kv/reading/last-inserted/import-33kv/' + importPointId);
    }
  }

  add33KVImportPointReading(importPointReading, response){
    if(response){
      let options : any = {observe : 'response'};
      return this.httpClient.post(this.URL_PREFIX + 'import-33kv/reading', importPointReading,  options);
    }else{
      return this.httpClient.post(this.URL_PREFIX + 'import-33kv/reading', importPointReading);
    }
  }
}