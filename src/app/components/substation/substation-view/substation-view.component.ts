import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SubstationService } from '@eas-services/substation/substation.service';
import { GlobalResources } from 'app/utility/global.resources';
import $ from 'jQuery';
import { GlobalConstants } from 'app/utility/global.constants';

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
  @ViewChild('closeButtonRef') closeButtonRef: ElementRef;
  constructor(private substationService : SubstationService, private globalResources : GlobalResources) { }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
    this.getSubstations();
  }

  getSubstations(){
    this.substationService.getSubstationByDivisionId(this.user.division.id).subscribe(success =>{
      console.log(success);
      this.substations = success;
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
    let confirmResponse : any = confirm("Are you sure to delete this Substation ?")
    if(confirmResponse){
      this.deleteSubstation(substation.id, this.user.username);
    }
  }

  deleteSubstation(substationId, deletedBy){
    console.log(substationId, deletedBy);
    this.substationService.deleteSubstationById(substationId, deletedBy).subscribe(success => {
      console.log(success);
      alert("Substation deleted successfully.");
      this.getSubstations();
    }, error =>{
      console.log(error);
    });
  }

  updateSubstation(updateSubstationForm){
    if(this.globalResources.validateForm(updateSubstationForm)){
      this.substationService.updateSubstation(this.substationToEdit, this.user.username).subscribe(success =>{
        alert("Substation Updated successfully.");
        this.closeModal(this.closeButtonRef);
      }, error =>{
        console.log(error);
        alert("Unable to update substation.");
      })
    }
  }

  closeModal(closeButtonRef: ElementRef){
    console.log(closeButtonRef);
    closeButtonRef.nativeElement.click();
  }

}
