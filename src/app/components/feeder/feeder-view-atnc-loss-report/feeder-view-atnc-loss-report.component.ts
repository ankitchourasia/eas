import { Component, OnInit, Input } from '@angular/core';
import { GlobalConstants } from '@eas-utility/global.constants';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { GlobalResources } from '@eas-utility/global.resources';

@Component({
  selector: 'eas-feeder-view-atnc-loss-report',
  templateUrl: './feeder-view-atnc-loss-report.component.html',
  styleUrls: ['./feeder-view-atnc-loss-report.component.css']
})
export class FeederViewAtncLossReportComponent implements OnInit {

  feederLossReportView : any;
  
  @Input("feederLossReportView")
  set setFeederLossReportView(feederLossReportView : any){
    console.log(feederLossReportView);
    this.feederLossReportView = feederLossReportView;
  }

  constructor(public globalConstants : GlobalConstants, public globalResources : GlobalResources) { 
  }

  ngOnInit() {
  }

  exportTotalContractDemandConsumers(report){
    console.log(report);
    let encodedCredentials = sessionStorage.getItem('encodedCredentials');
    let params = {
      Authorization: "Basic " + encodedCredentials,
      feederId: report.feederId,
      billMonth: report.lossMonth,
      groupNo: report.billingGroupNo
    };
  
    let fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "feeder/atc-loss/contract-demand/consumers/export";
    this.globalResources.downloadFile(fileUrl, params);
  }

  exportTotalCollectionConsumers(report){
    let encodedCredentials = sessionStorage.getItem('encodedCredentials');
    let params = {
      Authorization: "Basic " + encodedCredentials,
      feederId: report.feederId,
      billMonth: report.lossMonth
    };
  
    let fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "feeder/atc-loss/collection/consumers/export";
    this.globalResources.downloadFile(fileUrl, params);
  }

}
