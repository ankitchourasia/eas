import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Injectable({
  providedIn: 'root'
})
export class FeederService {
  
  private URL_PREFIX = GlobalConfiguration.URL_PREFIX;
  FEEDER_URL = "feeder/";

  constructor(private http : HttpClient) { }

  addFeeder(feeder){
    return this.http.post(this.URL_PREFIX + this.FEEDER_URL, feeder);
  }

  getFeederByDivisionId(divisionId){
    return this.http.get(this.URL_PREFIX + this.FEEDER_URL +'division/' + divisionId);
  }

  deleteFeederById(feederId, deletedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("deletedBy", deletedBy);
    let options = {
      params: httpParams
    };
    return this.http.delete(this.URL_PREFIX + this.FEEDER_URL + feederId, options);
  }

  updateFeeder(feeder, updatedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("updatedBy", updatedBy);
    let options = {
      params: httpParams
    };
    return this.http.put(this.URL_PREFIX + this.FEEDER_URL + feeder.id, feeder, options);
  }

  getFeederBySubstationId(substationId){
    return this.http.get(this.URL_PREFIX + this.FEEDER_URL + 'substation/' + substationId);
  }

  getPreviousReadingByFeederId(feederId){
    return this.http.get(this.URL_PREFIX + this.FEEDER_URL + 'reading/last-inserted/feeder/id/' + feederId);
  }

  addFeederReading(feederReading, punchedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("punchedBy", punchedBy);
    let options = {
      params: httpParams
    };
    return this.http.post(this.URL_PREFIX + this.FEEDER_URL + 'reading', feederReading, options);
  }

  addFeederMeterReplacement(replacementData, punchedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("punchedBy", punchedBy);
    let options = {
      params: httpParams
    };
    return this.http.post(this.URL_PREFIX + this.FEEDER_URL + 'meter/replacement', replacementData, options);
  }

  getFeederReadingsByDivisionId(divisionId, billMonth){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    return this.http.get(this.URL_PREFIX + this.FEEDER_URL + 'reading/division/id/' + divisionId, options);
  }

  getFeederLossDataByDivisionId(divisionId, billMonth){
    return this.http.get(this.URL_PREFIX + 'feeder-loss-data/division/id/' + divisionId + "/bill-month/" + billMonth);
  }

  updateFeederReading(reading, nextBillMonth, updatedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("nextBillMonth", nextBillMonth)
    .append("updatedBy", updatedBy);
    let options = {
      params: httpParams
    };
    return this.http.put(this.URL_PREFIX + this.FEEDER_URL + 'reading/' + reading.id, reading, options);
  }

  getFeederAbsentReadingsByDivisionId(divisionId, billMonth){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    return this.http.get(this.URL_PREFIX + this.FEEDER_URL + 'absent/reading/' + divisionId, options);
  }

  getFeedersForLossGenerationBySubstationId(substationId, billMonth){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    return this.http.get(this.URL_PREFIX + this.FEEDER_URL + 'lossgeneration/substation/' + substationId, options);
  }

  generateFeedertndLossReport(feeder, billMonth, generatedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("generatedBy", generatedBy)
    .append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    return this.http.post(this.URL_PREFIX + this.FEEDER_URL + 'loss/single', feeder, options);
  }

  getFeederTnDLossBySubstationId(substationId, billMonth){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    return this.http.get(this.URL_PREFIX + this.FEEDER_URL + 'loss/substation/id/' + substationId, options);
  }

  generateFeedertndLossWithoutHTReport(feeder, billMonth, generatedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("generatedBy", generatedBy)
    .append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    return this.http.post(this.URL_PREFIX + this.FEEDER_URL + 'loss/without-ht/single', feeder, options);
  }

  getFeederTnDLossWithoutHTBySubstationId(substationId, billMonth){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    return this.http.get(this.URL_PREFIX + this.FEEDER_URL + 'loss/without-ht/substation/id/' + substationId, options);
  }

  getFeedersForATnCLossGenerationBySubstationId(substationId, billMonth){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    return this.http.get(this.URL_PREFIX + this.FEEDER_URL + 'atcloss/generation/substation/id/' + substationId, options);
  }

  generateFeederATnCLossReport(feeder, billMonth, generatedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("generatedBy", generatedBy)
    .append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    return this.http.post(this.URL_PREFIX + this.FEEDER_URL + 'atc-loss/single', feeder, options);
  }

  getFeederATnCLossBySubstationId(substationId, billMonth){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    return this.http.get(this.URL_PREFIX + this.FEEDER_URL + 'atc-loss/substation/id/' + substationId, options);
  }

  getFeederReadingsByFeederId(feederId, meterNo, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("feederId", feederId)
    .append("meterNo", meterNo);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.http.get(this.URL_PREFIX + this.FEEDER_URL + 'reading', options);
  }

  addFeederMapping(feederMapping, response){
    if(response){
      let options : any = { observe : "response" };
      return this.http.post(this.URL_PREFIX + 'interDivision/feeder', feederMapping, options);
    } else{
      return this.http.post(this.URL_PREFIX + 'interDivision/feeder', feederMapping);
    }
  }

  addFeederInterruption(feederInterruption, response){
    if(response){
      let options : any = { observe : "response" };
      return this.http.post(this.URL_PREFIX + this.FEEDER_URL + 'interruption', feederInterruption, options);
    } else{
      return this.http.post(this.URL_PREFIX + this.FEEDER_URL + 'interruption', feederInterruption);
    }
  }

  add33KVFeeder(feeder, response){
    if(response){
      let options : any = {observe : 'response'};
      return this.http.post(this.URL_PREFIX + 'feeder-33kv/', feeder,  options);
    }else{
      return this.http.post(this.URL_PREFIX + 'feeder-33kv/', feeder);
    }
  }
  
  get33KVFeederByZoneId(zoneId, response){
    if(response){
      let options : any = {observe : 'response'};
      return this.http.get(this.URL_PREFIX + 'feeder-33kv/zone/' + zoneId,  options);
    }else{
      return this.http.get(this.URL_PREFIX + 'feeder-33kv/zone/' + zoneId);
    }
  }

  get33KVFeederByDivisionId(divisionId, response){
    if(response){
      let options : any = {observe : 'response'};
      return this.http.get(this.URL_PREFIX + 'feeder-33kv/division/' + divisionId,  options);
    }else{
      return this.http.get(this.URL_PREFIX + 'feeder-33kv/division/' + divisionId);
    }
  }

  delete33KVFeederById(feederId, deletedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("deletedBy", deletedBy);
    let options = {
      params: httpParams
    };
    return this.http.delete(this.URL_PREFIX + 'feeder-33kv/' + feederId, options);
  }

  update33KVFeeder(feeder, updatedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("updatedBy", updatedBy);
    let options = {
      params: httpParams
    };
    return this.http.put(this.URL_PREFIX + 'feeder-33kv/' + feeder.id, feeder, options);
  }
  
  getPreviousReadingBy33KVFeederId(feederId, response){
    if(response){
      let options : any = {observe : 'response'};
      return this.http.get(this.URL_PREFIX + 'feeder-33kv/reading/last-inserted/feeder-33kv/' + feederId,  options);
    }else{
      return this.http.get(this.URL_PREFIX + 'feeder-33kv/reading/last-inserted/feeder-33kv/' + feederId);
    }
  }

  add33KVFeederReading(feederReading, punchedBy, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("punchedBy", punchedBy);
    let options = { params: httpParams };
    if(response){ 
      options['observe'] = "response"; 
    }
    return this.http.post(this.URL_PREFIX + 'feeder-33kv/reading', feederReading, options);
  }

  update33KVFeederReading(reading, nextBillMonth){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("nextBillMonth", nextBillMonth);
    let options = {
      params: httpParams
    };
    return this.http.put(this.URL_PREFIX + 'feeder-33kv/reading/id/' + reading.id, reading, options);
  }

  add33KVFeederReadWithMeterReplacement(feederReading, punchedBy, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("punchedBy", punchedBy);
    let options = { params: httpParams };
    if(response){ 
      options['observe'] = "response"; 
    }
    return this.http.post(this.URL_PREFIX + 'feeder-33kv/meter/replacement', feederReading, options);
  }

    
  get33KVFeederReadingsByZoneIdAndBillMonth(zoneId, billMonth, response){
    if(response){
      let options : any = {observe : 'response'};
      return this.http.get(this.URL_PREFIX + 'feeder-33kv/reading/zone/' + zoneId + '/bill-month/' + billMonth,  options);
    }else{
      return this.http.get(this.URL_PREFIX + 'feeder-33kv/reading/zone/' + zoneId + '/bill-month/' + billMonth);
    }
  }

  get33KVFeederReadingsByDivisionIdAndbillMonth(divisionId, billMonth, response){
    if(response){
      let options : any = {observe : 'response'};
      return this.http.get(this.URL_PREFIX + 'feeder-33kv/reading/division/' + divisionId + '/bill-month/' + billMonth,  options);
    }else{
      return this.http.get(this.URL_PREFIX + 'feeder-33kv/reading/division/' + divisionId + '/bill-month/' + billMonth);
    }
  }

  getAbsent33KVFeederReadByDivisionId(divisionId, billMonth, response){
    if(response){
      let options : any = {observe : 'response'};
      return this.http.get(this.URL_PREFIX + 'feeder-33kv/absent/reading/division/' + divisionId + '/bill-month/' + billMonth,  options);
    }else{
      return this.http.get(this.URL_PREFIX + 'feeder-33kv/absent/reading/division/' + divisionId + '/bill-month/' + billMonth);
    }
  }

  getAbsent33KVFeederReadByZoneId(zoneId, billMonth, response){
    if(response){
      let options : any = {observe : 'response'};
      return this.http.get(this.URL_PREFIX + 'feeder-33kv/absent/reading/zone/' + zoneId + '/bill-month/' + billMonth,  options);
    }else{
      return this.http.get(this.URL_PREFIX + 'feeder-33kv/absent/reading/zone/' + zoneId + '/bill-month/' + billMonth);
    }
  }

  generateFeederLossByDivisionId(divisionId, billMonth){
    return this.http.post(this.URL_PREFIX + 'feeder-loss/division/id/' + divisionId + "/bill-month/" + billMonth, null);
  }

  getFeederLossByDivisionId(divisionId, billMonth){
    return this.http.get(this.URL_PREFIX + 'feeder-loss/division/id/' + divisionId + "/bill-month/" + billMonth);
  }

  uploadHT11KVReadFile(file, billMonth){
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.URL_PREFIX + 'htreading/file/upload/bill-month/' + billMonth, formData);
  }

  uploadHT33KVReadFile(file, billMonth){
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.URL_PREFIX + 'ht-consumer-33kv/reading/file/upload/bill-month/' + billMonth, formData);
  }
}
