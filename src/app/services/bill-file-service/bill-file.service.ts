import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Injectable({
  providedIn: 'root'
})
export class BillFileService {

  private URL_PREFIX = GlobalConfiguration.URL_PREFIX;
  private BILL_FILE_REF_URL = "billfileref/";

  constructor(private http : HttpClient) { }

  checkBillFileUploadedByFeederGroupNoAndBillMonth(feederGroupNo, billMonth, response){
    // return this.http.get(this.URL_PREFIX + this.BILL_FILE_REF_URL + 'reading/dtr/id/' + dtrId);
    let httpParams = new HttpParams();
    httpParams = httpParams.append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.http.get(this.URL_PREFIX + this.BILL_FILE_REF_URL + 'groupNo/' + feederGroupNo,  options);
  }

  getUploadedBillFileListByZoneIdAndBillMonth(zoneId, billMonth, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.http.get(this.URL_PREFIX + this.BILL_FILE_REF_URL + 'zone/locationCode/' + zoneId,  options);
  }

  getUploadedBillFileListByDivisionNameAndBillMonth(divisionName, billMonth, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.http.get(this.URL_PREFIX + this.BILL_FILE_REF_URL + 'division/name/' + divisionName,  options);
  }

  getNotUploadedBillFileListByZoneIdAndBillMonth(zoneId, billMonth, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.http.get(this.URL_PREFIX + this.BILL_FILE_REF_URL + 'missing/zone/id/' + zoneId,  options);
  }

  getNotUploadedBillFileListByDivisionIdAndBillMonth(divisionId, billMonth, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.http.get(this.URL_PREFIX + this.BILL_FILE_REF_URL + 'missing/division/id/' + divisionId,  options);
  }

  uploadBillFile(file, uploadedBy, response){
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    let httpParams = new HttpParams();
    httpParams = httpParams.append("uploadedBy", uploadedBy);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.http.post(this.URL_PREFIX + 'billfile/fast-upload/', formData,  options);
  }

  // uploadBillFile(file, uploadedBy) {
  //   let formData: FormData = new FormData();
  //   formData.append('file', file, file.name);
  //   let httpParams = new HttpParams();
  //   httpParams = httpParams.append("uploadedBy", uploadedBy);
  //   let options = {
  //     params: httpParams,
  //     reportProgress: true,
  //   };
  //   options['observe'] = "events";
  //   return this.http.post<any>(this.URL_PREFIX + 'billfile/fast-upload/', formData, options)
  //   .pipe(map((event) => {
  //       switch (event.type) {
  //         case HttpEventType.UploadProgress:
  //           const progress = Math.round(100 * event.loaded / event.total);
  //           return { status: 'progress', message: progress };
  //         case HttpEventType.Response:
  //           return event.body;
  //         default:
  //           return `Unhandled event: ${event.type}`;
  //       }
  //     })
  //   );
  // }
}
