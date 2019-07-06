import { Component, OnInit } from '@angular/core';
import { GlobalResources } from 'app/utility/global.resources';

@Component({
  selector: 'eas-feeder-add',
  templateUrl: './feeder-add.component.html',
  styleUrls: ['./feeder-add.component.css']
})
export class FeederAddComponent implements OnInit {

  formData:any = {};
  constructor(public globalResources: GlobalResources) { }

  ngOnInit() {
  }

  submitClicked(feederAddForm){
    if(this.globalResources.validateForm(feederAddForm)){
      console.log("valid form");
    }
  }

  resetClicked(){

  }

}
