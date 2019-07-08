import { Component, OnInit } from '@angular/core';
import { SubstationService } from '@eas-services/substation/substation.service';
import { GlobalResources } from 'app/utility/global.resources';

@Component({
  selector: 'eas-substation-view',
  templateUrl: './substation-view.component.html',
  styleUrls: ['./substation-view.component.css']
})
export class SubstationViewComponent implements OnInit {

  user : any;
  substations : any = [];
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

}
