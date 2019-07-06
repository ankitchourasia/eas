import { Component, OnInit } from '@angular/core';
import { GlobalResources } from 'app/utility/global.resources';

@Component({
  selector: 'eas-substation-add',
  templateUrl: './substation-add.component.html',
  styleUrls: ['./substation-add.component.css']
})
export class SubstationAddComponent implements OnInit {

  formData : any = {};
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
