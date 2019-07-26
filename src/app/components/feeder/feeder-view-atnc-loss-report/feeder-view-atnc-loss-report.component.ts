import { Component, OnInit, Input } from '@angular/core';
import { GlobalConstants } from 'app/utility/global.constants';
import { GlobalConfiguration } from 'app/utility/global-configuration';
import $ from 'jQuery';

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

  constructor(public globalConstants : GlobalConstants) { 
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
    // Add authentication headers in URL
    let url = [fileUrl, $.param(params)].join('?');
    window.open(url);
  }

  exportTotalCollectionConsumers(report){
    let encodedCredentials = sessionStorage.getItem('encodedCredentials');
    let params = {
      Authorization: "Basic " + encodedCredentials,
      feederId: report.feederId,
      billMonth: report.lossMonth
    };
  
    let fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "feeder/atc-loss/collection/consumers/export";
    // Add authentication headers in URL
    let url = [fileUrl, $.param(params)].join('?');
    window.open(url);
  }

}
