import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConstants } from '@eas-utility/global.constants';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { HtConsumerService } from '@eas-services/ht-consumer-service/ht-consumer.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Component({
  selector: 'eas-ht-consumer-view-consumption',
  templateUrl: './ht-consumer-view-consumption.component.html',
  styleUrls: ['./ht-consumer-view-consumption.component.css']
})
export class HtConsumerViewConsumptionComponent implements OnInit {

  user:any;
  pager: any;
  pageSize: number;
  pagedList:any;
  billMonth: any;
  billMonthYear: any;
  htConsumerConsumptionList:any;
  loading: boolean;

  public readonly ROLE_HTM_ADMIN = GlobalConfiguration.ROLE_HTM_ADMIN;
  
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants,
    private paginationService : PaginationService, private htConsumerService: HtConsumerService) { }

    ngOnInit() {
      this.user = this.globalResources.getUserDetails();
      this.setInitialValue();
    }
  
    setInitialValue(){
      this.pagedList = [];
      this.htConsumerConsumptionList = [];
    }

    searchClicked(){
      this.setInitialValue();
      if(this.user.role === GlobalConfiguration.ROLE_ADMIN){
        this.getHTConsumerConsumptionByDivisionIdAndBillMonth(this.user.division.id);
      }else if(this.user.role === GlobalConfiguration.ROLE_HTM_ADMIN){
        this.getHTConsumerConsumptionByDivisionIdAndBillMonth(this.user.division.id);
      }else if(this.user.role === GlobalConfiguration.ROLE_FIELD_ADMIN){
        this.getHTConsumerConsumptionByDivisionIdAndBillMonth(this.user.division.id);
      }
    }

    getHTConsumerConsumptionByDivisionIdAndBillMonth(divisionId){
      this.loading = true;
      this.htConsumerConsumptionList = [];
      let billingMonth = this.billMonth + "-" + this.billMonthYear;
      this.htConsumerService.getHTConsumerConsumptionByDivisionIdAndBillMonth(divisionId, billingMonth, false).subscribe(successResponse =>{
        this.loading = false;
        this.htConsumerConsumptionList = successResponse;
        this.initializePaginationVariables();
        if(this.htConsumerConsumptionList && this.htConsumerConsumptionList.length){
          this.setPage(1);
        }
      },errorResponse =>{
        this.loading = false;
        console.log(errorResponse);
      });
    }

  initializePaginationVariables(){
    this.pager = {};
    this.pageSize = 10;
    this.pagedList = [];
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.htConsumerConsumptionList.length, page, this.pageSize);
    this.pagedList = this.htConsumerConsumptionList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  exportClicked(){
		let params = {
        Authorization: 'Basic '+ sessionStorage.getItem("encodedCredentials"),
        billMonth : this.billMonth + "-" + this.billMonthYear
		};
    let fileUrl;
    if(this.user.role === GlobalConfiguration.ROLE_HTM_ADMIN || this.user.role === GlobalConfiguration.ROLE_FIELD_ADMIN || GlobalConfiguration.ROLE_ADMIN){
			fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "export/htconsumption/division/id/" + this.user.division.id;
		}
		this.globalResources.downloadFile(fileUrl, params)
	};

}
