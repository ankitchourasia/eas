import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SubstationService } from '@eas-services/substation/substation.service';
import { GlobalResources } from 'app/utility/global.resources';
import $ from 'jQuery';
import { GlobalConstants } from 'app/utility/global.constants';
import { PaginationService } from '@eas-services/pagination/pagination.service';

@Component({
  selector: 'eas-substation-view',
  templateUrl: './substation-view.component.html',
  styleUrls: ['./substation-view.component.css']
})
export class SubstationViewComponent implements OnInit {

  user : any;
  substations : any = [];
  substationToEdit = {};
  showModal : boolean;
  pagedSubstations : any = [];

  pager: any = {};
  pageSize: number;

  @ViewChild('closeButtonRef') closeButtonRef: ElementRef;
  constructor(private substationService : SubstationService, private globalResources : GlobalResources, private paginationService : PaginationService) { }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
    this.getSubstations();
    this.initializePaginationVariables();
  }

  initializePaginationVariables(){
    this.pager = {};
    this.pageSize = 10;
  }

  getSubstations(){
    this.substationService.getSubstationByDivisionId(this.user.division.id).subscribe(success =>{
      console.log(success);
      this.substations = success;
      this.setPage(1);
    }, error =>{
      console.log(error);
    });
  }

  exportClicked(){
    var params = {Authorization: 'Basic ' + sessionStorage.getItem('encodedCredentials')};
    let fileUrl = null;
    if(this.user.role === 'admin'){
			fileUrl = GlobalConstants.URL_PREFIX_FOR_FILE_EXPORT + "export/substation/division/" + this.user.division.id;
		}else{
			fileUrl = GlobalConstants.URL_PREFIX_FOR_FILE_EXPORT + "export/substation/zone/" + this.user.zone.id;
		}
    var url = [fileUrl, $.param(params)].join('?');
		window.open(url);
  }

  editButtonClicked(substation){
    this.showModal = true;
    this.substationToEdit = Object.assign({}, substation);
  }

  deleteButtonClicked(substation){
    // let confirmResponse : any = confirm("Are you sure to delete this Substation ?")
    // if(confirmResponse){
    //   this.deleteSubstation(substation.id, this.user.username);
    // }
    let confirmAlertResponse : any = this.globalResources.confirmAlert("Are you sure to delete this Substation ?")
    confirmAlertResponse.then((result) => {
      if(result.value) {
        this.deleteSubstation(substation.id, this.user.username);
      }else{
        console.log("confirm alert else");
      }
    });
  }

  deleteSubstation(substationId, deletedBy){
    console.log(substationId, deletedBy);
    this.substationService.deleteSubstationById(substationId, deletedBy).subscribe(success => {
      let alertResponse = this.globalResources.successAlert("Substation deleted Successfully");
      alertResponse.then(result =>{
        this.getSubstations();
      });
    }, error =>{
      console.log(error);
    });
  }

  updateSubstation(updateSubstationForm){
    if(this.globalResources.validateForm(updateSubstationForm)){
      this.substationService.updateSubstation(this.substationToEdit, this.user.username).subscribe(success =>{
        let alertResponse = this.globalResources.successAlert("Substation updated Successfully");
        alertResponse.then(result =>{
          this.closeModal(this.closeButtonRef);
          console.log("alert result", result);
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
    this.pager = this.paginationService.getPager(this.substations.length, page, this.pageSize);
    console.log(this.pager);
    this.pagedSubstations = this.substations.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedSubstations);
  }
  
  closeModal(closeButtonRef: ElementRef){
    console.log(closeButtonRef);
    closeButtonRef.nativeElement.click();
  }

}
