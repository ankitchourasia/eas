import { Component, OnInit } from '@angular/core';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { GlobalResources } from 'app/utility/global.resources';
import { GlobalConstants } from 'app/utility/global.constants';
import { HtConsumerService } from '@eas-services/ht-consumer-service/ht-consumer.service';

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
  
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants,
    private paginationService : PaginationService, private htConsumerService: HtConsumerService) { }

    ngOnInit() {
      this.checkUserRoll();
    }
  
    checkUserRoll(){
      this.user = this.globalResources.getUserDetails();
      if(this.user.role === this.globalConstants.ROLE_ADMIN){
        this.getAllHTConsumersByDivisionId(this.user.division.id);
      }else if(this.user.role === this.globalConstants.ROLE_HTM_ADMIN){
        this.getAllHTConsumersByDivisionId(this.user.division.id);
      }else if(this.user.role === this.globalConstants.ROLE_FIELD_ADMIN){
        this.getAllHTConsumersByDivisionId(this.user.division.id);
      }
    }

    getAllHTConsumersByDivisionId(divisionId){
      this.htConsumerService.getHTConsumerByDivisionId(divisionId, false).subscribe(successResponse =>{
        console.log(successResponse);
      },errorResponse =>{
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

}
