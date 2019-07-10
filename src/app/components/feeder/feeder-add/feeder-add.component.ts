import { Component, OnInit } from '@angular/core';
import { GlobalResources } from 'app/utility/global.resources';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { SubstationService } from '@eas-services/substation/substation.service';

@Component({
  selector: 'eas-feeder-add',
  templateUrl: './feeder-add.component.html',
  styleUrls: ['./feeder-add.component.css']
})
export class FeederAddComponent implements OnInit {

  user : any;
  feeder:any;
  substationList: any;
  loading : boolean;
  
  constructor(public globalResources: GlobalResources, private feederService : FeederService,
    private substationService: SubstationService) { 

  }

  ngOnInit() {
    this.feeder = {};
    this.substationList = null;
    this.user = this.globalResources.getUserDetails();
  }

  zoneChanged(){
    console.log("zoneChanged");
    this.substationList = null;
    this.feeder.substationId = undefined;
    this.getSubstationByZoneId(this.feeder.zoneId);
  }

  getSubstationByZoneId(zoneId){
    this.substationService.getSubstationsByZoneId(zoneId).subscribe(succcess =>{
      this.substationList = succcess;
    }, error =>{
      console.log(error);
    });
  }
  
  submitClicked(feederAddForm){
    this.loading = true;
    if(this.globalResources.validateForm(feederAddForm)){
      this.feederService.addFeeder(this.feeder).subscribe(success =>{
        this.loading = false;
        let alertResponse = this.globalResources.successAlert("Feeder added successfully");
        alertResponse.then(result =>{
          this.feeder = {};
          this.globalResources.resetValidateForm(feederAddForm);
        });
      }, error =>{
        this.loading = false;
        console.log(error);
      })
    } else{
      this.loading = false;
    }
  }

  resetClicked(){

  }

}
