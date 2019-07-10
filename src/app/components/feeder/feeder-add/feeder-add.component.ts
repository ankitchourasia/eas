import { Component, OnInit } from '@angular/core';
import { GlobalResources } from 'app/utility/global.resources';
import { FeederService } from '@eas-services/feeder/feeder.service';

@Component({
  selector: 'eas-feeder-add',
  templateUrl: './feeder-add.component.html',
  styleUrls: ['./feeder-add.component.css']
})
export class FeederAddComponent implements OnInit {

  feeder:any = {};
  user : any;
  loading : boolean;
  
  constructor(public globalResources: GlobalResources, private feederService : FeederService) { 

  }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
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
