import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConstants } from '@eas-utility/global.constants';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { HtConsumerService } from '@eas-services/ht-consumer-service/ht-consumer.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Component({
  selector: 'eas-ht-consumer-view-absent-consumption',
  templateUrl: './ht-consumer-view-absent-consumption.component.html',
  styleUrls: ['./ht-consumer-view-absent-consumption.component.css']
})
export class HtConsumerViewAbsentConsumptionComponent implements OnInit {

  user:any;
  pager: any;
  pageSize: number;
  pagedList:any;
  billMonth: any;
  billMonthYear: any;
  htConsumerAbsentConsumptionList:any;
  searchButtonClicked: boolean;
  
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants,
    private paginationService : PaginationService, private htConsumerService: HtConsumerService) { }

    ngOnInit() {
      this.user = this.globalResources.getUserDetails();
    }
  
    searchClicked(){
      if(this.user.role === this.globalConstants.ROLE_ADMIN){
        this.getHTConsumerAbsentConsumptionByDivisionIdAndBillMonth(this.user.division.id);
      }else if(this.user.role === this.globalConstants.ROLE_HTM_ADMIN){
        this.getHTConsumerAbsentConsumptionByDivisionIdAndBillMonth(this.user.division.id);
      }else if(this.user.role === this.globalConstants.ROLE_FIELD_ADMIN){
        this.getHTConsumerAbsentConsumptionByDivisionIdAndBillMonth(this.user.division.id);
      }
    }

    getHTConsumerAbsentConsumptionByDivisionIdAndBillMonth(divisionId){
      this.searchButtonClicked = true;
      this.htConsumerAbsentConsumptionList = null;
      let billingMonth = this.billMonth + "-" + this.billMonthYear;
      this.htConsumerService.getHTConsumerAbsentConsumptionByDivisionIdAndBillMonth(divisionId, billingMonth, false).subscribe(successResponse =>{
        this.searchButtonClicked = false;
        this.htConsumerAbsentConsumptionList = successResponse;
        this.initializePaginationVariables();
        this.setPage(1);
      },errorResponse =>{
        this.searchButtonClicked = false;
        console.log(errorResponse);
      });
    }

  initializePaginationVariables(){
    this.pager = {};
    this.pageSize = 10;
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.htConsumerAbsentConsumptionList.length, page, this.pageSize);
    this.pagedList = this.htConsumerAbsentConsumptionList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  exportClicked(){
		let params = {
        Authorization: 'Basic '+ sessionStorage.getItem("encodedCredentials"),
        billMonth : this.billMonth + "-" + this.billMonthYear
		};
    let fileUrl;
    if(this.user.role === this.globalConstants.ROLE_HTM_ADMIN || this.user.role === this.globalConstants.ROLE_FIELD_ADMIN || this.globalConstants.ROLE_ADMIN){
			fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "export/htconsumption/absent/division/id/" + this.user.division.id;
		}
		this.globalResources.downloadFile(fileUrl, params)
	};

}
