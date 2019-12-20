import { Injectable } from '@angular/core';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HtConsumerService {

  private URL_PREFIX = GlobalConfiguration.URL_PREFIX;
  private HT_CONSUMER_URL = "htconsumer/";
  
  constructor(private http : HttpClient) { }

  getHTConsumerByDivisionId(divisionId, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.http.get(this.URL_PREFIX + this.HT_CONSUMER_URL + 'division/id/' + divisionId,  options);
    }else{
      return this.http.get(this.URL_PREFIX + this.HT_CONSUMER_URL + 'division/id/' + divisionId);
    }
  }

  getHTConsumerConsumptionByDivisionIdAndBillMonth(divisionId, billMonth, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.http.get(this.URL_PREFIX  + 'htreading/division/id/' + divisionId,  options);
  }

  getHTConsumerAbsentConsumptionByDivisionIdAndBillMonth(divisionId, billMonth, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.http.get(this.URL_PREFIX + this.HT_CONSUMER_URL + 'remaining/consumption/' + divisionId,  options);
  }

  addHTConsumer(htConsumer, response){
    if(response){
      let options : any = { observe : "response" };
      return this.http.post(this.URL_PREFIX + this.HT_CONSUMER_URL, htConsumer, options);
    } else {
      return this.http.post(this.URL_PREFIX + this.HT_CONSUMER_URL, htConsumer);
    }
  }

  getHTConsumerByServiceNo(serviceNo, response){
    if(response){
      let options : any = { observe : "response" };
      return this.http.get(this.URL_PREFIX + this.HT_CONSUMER_URL + "servicenumber/" + serviceNo, options);
    } else {
      return this.http.get(this.URL_PREFIX + this.HT_CONSUMER_URL + "servicenumber/" + serviceNo);
    }
  }

  addHTConsumerReading(reading, response){
    if(response){
      let options : any = { observe : "response" };
      return this.http.post(this.URL_PREFIX + 'htreading', reading, options);
    } else {
      return this.http.post(this.URL_PREFIX + 'htreading', reading);
    }
  }

  getHTConsumerListByZoneId(zoneId, response){
    if(response){
      let options : any = { observe : "response" };
      return this.http.get(this.URL_PREFIX + 'ht-consumer-33kv/zone/' + zoneId, options);
    } else {
      return this.http.get(this.URL_PREFIX + 'ht-consumer-33kv/zone/' + zoneId);
    }
  }

  getHTConsumerListByFeederId(feederId, response){
    if(response){
      let options : any = { observe : "response" };
      return this.http.get(this.URL_PREFIX + 'ht-consumer-33kv/feeder-33kv/' + feederId, options);
    } else {
      return this.http.get(this.URL_PREFIX + 'ht-consumer-33kv/feeder-33kv/' + feederId);
    }
  }

  add33KVHTConsumer(htConsumer, response){
    if(response){
      let options : any = { observe : "response" };
      return this.http.post(this.URL_PREFIX + 'ht-consumer-33kv/', htConsumer, options);
    } else {
      return this.http.post(this.URL_PREFIX + 'ht-consumer-33kv/', htConsumer);
    }
  }

  add33KVHTConsumerReading(reading, response){
    if(response){
      let options : any = { observe : "response" };
      return this.http.post(this.URL_PREFIX + 'ht-consumer-33kv/reading/', reading, options);
    } else {
      return this.http.post(this.URL_PREFIX + 'ht-consumer-33kv/reading/', reading);
    }
  }
}
