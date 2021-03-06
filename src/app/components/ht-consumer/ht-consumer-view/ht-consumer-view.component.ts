import { Component, OnInit } from '@angular/core';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConstants } from '@eas-utility/global.constants';
import { HtConsumerService } from '@eas-services/ht-consumer-service/ht-consumer.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Component({
  selector: 'eas-ht-consumer-view',
  templateUrl: './ht-consumer-view.component.html',
  styleUrls: ['./ht-consumer-view.component.css']
})
export class HtConsumerViewComponent implements OnInit {

  user:any;
  pager: any;
  pageSize: number;
  pagedList:any;
  htConsumerList:any;
  loading: boolean;

  public readonly ROLE_HTM_ADMIN = GlobalConfiguration.ROLE_HTM_ADMIN;
  
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants,
    private paginationService : PaginationService, private htConsumerService: HtConsumerService) { }

    ngOnInit() {
      this.checkUserRoll();
    }
  
    checkUserRoll(){
      this.user = this.globalResources.getUserDetails();
      if(this.user.role === GlobalConfiguration.ROLE_ADMIN){
        this.getAllHTConsumersByDivisionId(this.user.division.id);
      }else if(this.user.role === GlobalConfiguration.ROLE_HTM_ADMIN){
        this.getAllHTConsumersByDivisionId(this.user.division.id);
      }else if(this.user.role === GlobalConfiguration.ROLE_FIELD_ADMIN){
        this.getAllHTConsumersByDivisionId(this.user.division.id);
      }
    }

    getAllHTConsumersByDivisionId(divisionId){
      this.loading = true;
      this.htConsumerList = [];
      this.htConsumerService.getHTConsumerByDivisionId(divisionId, false).subscribe(successResponse =>{
        this.loading = false;
        this.htConsumerList = successResponse;
        this.initializePaginationVariables();
        if(this.htConsumerList && this.htConsumerList.length){
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
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.htConsumerList.length, page, this.pageSize);
    this.pagedList = this.htConsumerList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  exportClicked(){
		let params = {
				Authorization: 'Basic '+ sessionStorage.getItem("encodedCredentials")
		};
		let fileUrl;
		if(this.user.role === GlobalConfiguration.ROLE_HTM_ADMIN || this.user.role === GlobalConfiguration.ROLE_FIELD_ADMIN || GlobalConfiguration.ROLE_ADMIN){
			fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "export/htconsumer/division/id/" + this.user.division.id;
		}
		this.globalResources.downloadFile(fileUrl, params)
	};

}
