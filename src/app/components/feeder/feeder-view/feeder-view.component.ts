import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GlobalResources } from 'app/utility/global.resources';
import { GlobalConstants } from 'app/utility/global.constants';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { SubstationService } from '@eas-services/substation/substation.service';
import $ from 'jQuery';

@Component({
  selector: 'eas-feeder-view',
  templateUrl: './feeder-view.component.html',
  styleUrls: ['./feeder-view.component.css']
})
export class FeederViewComponent implements OnInit {

  user : any;
  feeders : any = [];
  feederToEdit: any = {};
  showModal : boolean;
  pagedFeeders : any = [];
  substationList: any;
  pager: any = {};
  pageSize: number;
  @ViewChild('modalCloseButtonRef') modalCloseButtonRef: ElementRef;
  constructor(private feederService : FeederService,  private substationService : SubstationService, 
    private globalResources : GlobalResources, private paginationService : PaginationService) { }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
    this.getFeeders();
    this.initializePaginationVariables();
  }

  initializePaginationVariables(){
    this.pager = {};
    this.pageSize = 10;
  }

  getFeeders(){
    this.feederService.getFeederByDivisionId(this.user.division.id).subscribe(success =>{
      console.log(success);
      this.feeders = success;
      this.setPage(1);
    }, error =>{
      console.log(error);
    });
  }

  exportClicked(){
    var params = {Authorization: 'Basic ' + sessionStorage.getItem('encodedCredentials')};
    let fileUrl = null;
    if(this.user.role === 'admin'){
			fileUrl = GlobalConstants.URL_PREFIX_FOR_FILE_EXPORT + "export/feeder/division/" + this.user.division.id;
		}else{
			fileUrl = GlobalConstants.URL_PREFIX_FOR_FILE_EXPORT + "export/feeder/zone/" + this.user.zone.id;
		}
    var url = [fileUrl, $.param(params)].join('?');
		window.open(url);
  }

  deleteButtonClicked(feeder){
    let confirmAlertResponse : any = this.globalResources.confirmAlert("Are you sure to delete this feeder ?")
    confirmAlertResponse.then((result) => {
      if(result.value) {
        this.deleteFeeder(feeder.id, this.user.username);
      }else{
        console.log("confirm alert else");
      }
    });
  }

  deleteFeeder(feederId, deletedBy){
    console.log(feederId, deletedBy);
    this.feederService.deleteFeederById(feederId, deletedBy).subscribe(success => {
      let alertResponse = this.globalResources.successAlert("feeder deleted successfully");
      alertResponse.then(result =>{
        this.getFeeders();
      });
    }, error =>{
      console.log(error);
    });
  }

  
  editButtonClicked(feeder){
    this.showModal = true;
    this.feederToEdit = Object.assign({}, feeder);
    console.log(this.feederToEdit);
    this.getSubstationByZoneId(this.feederToEdit.zoneId);
  }

  zoneChanged(){
    console.log("zoneChanged");
    this.substationList = null;
    this.feederToEdit.substationId = undefined;
    this.getSubstationByZoneId(this.feederToEdit.zoneId);
  }

  getSubstationByZoneId(zoneId){
    this.substationService.getSubstationsByZoneId(zoneId).subscribe(succcess =>{
      this.substationList = succcess;
    }, error =>{
      console.log(error);
    });
  }
  
  updateClicked(updateFeederForm){
    if(this.globalResources.validateForm(updateFeederForm)){
      this.feederService.updateFeeder(this.feederToEdit, this.user.username).subscribe(success =>{
        let alertResponse = this.globalResources.successAlert("Feeder updated successfully");
        alertResponse.then(result =>{
          console.log("alert result", result);
          this.closeModal(this.modalCloseButtonRef);
          this.getFeeders();
        });
      }, error =>{
        console.log(error);
        let alertResponse = this.globalResources.errorAlert("Unable to update substation.");
        alertResponse.then(result =>{
          console.log("alert result", result);
        });
      })
    }
  }

  setPage(page: number) {
    console.log(page);
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.feeders.length, page, this.pageSize);
    console.log(this.pager);
    this.pagedFeeders = this.feeders.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedFeeders);
  }
  
  closeModal(modalCloseButtonRef: ElementRef){
    console.log(modalCloseButtonRef);
    modalCloseButtonRef.nativeElement.click();
  }


}
