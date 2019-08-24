import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConstants } from '@eas-utility/global.constants';
import { DtrService } from '@eas-services/dtr-service/dtr.service';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { SubstationService } from '@eas-services/substation/substation.service';
import { RegionService } from '@eas-services/region-service/region.service';
import { CircleService } from '@eas-services/circle-service/circle.service';
import { DivisionService } from '@eas-services/division-service/division.service';
import { ZoneService } from '@eas-services/zone/zone.service';

@Component({
  selector: 'eas-dtr-add-initial-read',
  templateUrl: './dtr-add-initial-read.component.html',
  styleUrls: ['./dtr-add-initial-read.component.css']
})
export class DtrAddInitialReadComponent implements OnInit {

  user : any;
  zoneList: any;
  regionList: any;
  circleList: any;
  divisionList: any;
  dtrList: any;
  feederList: any;
  substationList: any;
  dtrInitialReadAdd: any;
  submitButtonClicked : boolean;

  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants, private dtrService : DtrService, 
    private feederService : FeederService, private substationService: SubstationService, private regionService: RegionService, 
    private circleService: CircleService, private divisionService: DivisionService, private zoneService: ZoneService) { }

  ngOnInit() {
    this.setPartialData();
  }

  setPartialData(){
    this.dtrInitialReadAdd = {};
    this.zoneList = [];
    this.regionList = [];
    this.circleList = [];
    this.divisionList = [];
    this.substationList = null;
    this.user = this.globalResources.getUserDetails();
    if(this.user.role === this.globalConstants.ROLE_SUPER_ADMIN){
      this.getRegionList();
    }else if(this.user.role === this.globalConstants.ROLE_ADMIN){
      this.zoneList = (this.user.zoneList);
      this.regionList.push(this.user.region);
      this.circleList.push(this.user.circle);
      this.divisionList.push(this.user.division);
      this.dtrInitialReadAdd.region = this.user.region;
      this.dtrInitialReadAdd.circle = this.user.circle;
      this.dtrInitialReadAdd.division = this.user.division;
    }else if(this.user.role === this.globalConstants.ROLE_FIELD_ADMIN){
      this.zoneList.push(this.user.zone);
      this.regionList.push(this.user.region);
      this.circleList.push(this.user.circle);
      this.divisionList.push(this.user.division);
      this.dtrInitialReadAdd.region = this.user.region;
      this.dtrInitialReadAdd.circle = this.user.circle;
      this.dtrInitialReadAdd.division = this.user.division;
      this.dtrInitialReadAdd.zone = this.user.zone;
      this.getSubstationByZoneId(this.dtrInitialReadAdd.zone.id);
    }
  }

  getRegionList(){
    this.regionService.getRegions(false).subscribe(successResponse =>{
      this.regionList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  regionChanged(region){
    if(this.user.role === this.globalConstants.ROLE_SUPER_ADMIN){
      this.circleList = null;
      this.dtrInitialReadAdd.circle = undefined;
      this.divisionList = null;
      this.dtrInitialReadAdd.division = undefined;
      this.zoneList = null;
      this.dtrInitialReadAdd.zone = undefined;
      this.substationList = null;
      this.dtrInitialReadAdd.substation = undefined;
      this.feederList = null;
      this.dtrInitialReadAdd.feeder = undefined;
      this.dtrList = null;
      this.dtrInitialReadAdd.dtr = undefined;
      this.getCircleListByRegionId(region.id);
    }
  }

  getCircleListByRegionId(regionId){
    this.circleService.getCirclesByRegionId(regionId, false).subscribe(successResponse =>{
      this.circleList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  circleChanged(circle){
    if(this.user.role === this.globalConstants.ROLE_SUPER_ADMIN){
      this.divisionList = null;
      this.dtrInitialReadAdd.division = undefined;
      this.zoneList = null;
      this.dtrInitialReadAdd.zone = undefined;
      this.substationList = null;
      this.dtrInitialReadAdd.substation = undefined;
      this.feederList = null;
      this.dtrInitialReadAdd.feeder = undefined;
      this.dtrList = null;
      this.dtrInitialReadAdd.dtr = undefined;
      this.getDivisionListByCircleId(circle.id);
    }
  }

  getDivisionListByCircleId(circleId){
    this.divisionService.getDivisionsByCircleId(circleId, false).subscribe(successResponse =>{
      this.divisionList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  divisionChanged(division){
    if(this.user.role === this.globalConstants.ROLE_SUPER_ADMIN){
      this.zoneList = null;
      this.dtrInitialReadAdd.zone = undefined;
      this.substationList = null;
      this.dtrInitialReadAdd.substation = undefined;
      this.feederList = null;
      this.dtrInitialReadAdd.feeder = undefined;
      this.dtrList = null;
      this.dtrInitialReadAdd.dtr = undefined;
      this.getZoneListByDivisionId(division.id);
    }
  }

  getZoneListByDivisionId(divisionId){
    this.zoneList = this.user.zoneList;
    this.zoneService.getZonseByDivisionId(divisionId, false).subscribe(successResponse =>{
      this.zoneList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }
  
  zoneChanged(zone){
    this.substationList = null;
    this.dtrInitialReadAdd.substation = undefined;
    this.feederList = null;
    this.dtrInitialReadAdd.feeder = undefined;
    this.dtrList = null;
    this.dtrInitialReadAdd.dtr = undefined;
    this.getSubstationByZoneId(zone.id);
  }

  getSubstationByZoneId(zoneId){
    this.substationService.getSubstationsByZoneId(zoneId).subscribe(successResponese =>{
      this.substationList = successResponese;
    }, errorResponse =>{
      console.log(errorResponse);
    });
  }

  substationChanged(substation){
    this.feederList = null;
    this.dtrInitialReadAdd.feeder = undefined;
    this.dtrList = null;
    this.dtrInitialReadAdd.dtr = undefined;
    this.getFeederBySubstationId(substation.id);  
  }

  getFeederBySubstationId(substationId){
    this.feederService.getFeederBySubstationId(substationId).subscribe(successResponese =>{
      this.feederList = successResponese;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  feederChanged(feeder){
    this.dtrList = null;
    this.dtrInitialReadAdd.dtr = undefined;
    this.getDTRByFeederId(feeder.id);
  }

  getDTRByFeederId(feederId){
    this.dtrService.getDTRByFeederId(feederId).subscribe(successResponse =>{
      console.log(successResponse);
      this.dtrList = successResponse;
    }, errorResponse =>{
      console.log(errorResponse)
    });
  }

  billMonthChanged(){
    this.dtrInitialReadAdd.prevReading = undefined;
		this.dtrInitialReadAdd.prevReadingDateInString = undefined;
    this.dtrInitialReadAdd.currReading = undefined;
    this.dtrInitialReadAdd.currReadingDate = undefined;
		this.dtrInitialReadAdd.currReadingDateInString = undefined;
		this.dtrInitialReadAdd.assUnit = 0;
		this.dtrInitialReadAdd.mf = undefined;
		this.dtrInitialReadAdd.meterNo = undefined;
		this.dtrInitialReadAdd.readingDiff = undefined;
		this.dtrInitialReadAdd.meterConsumption = undefined;
		this.dtrInitialReadAdd.totalConsumption = undefined;
		if(this.dtrInitialReadAdd.year && this.dtrInitialReadAdd.month){
			this.dtrInitialReadAdd.billMonth = this.dtrInitialReadAdd.month + "-" + this.dtrInitialReadAdd.year;
    }
  }

  billMonthYearChanged(){
    this.billMonthChanged();
  }

  dtrChanged(dtr){
    this.checkInitialReadingPresent(dtr);
  }

  checkInitialReadingPresent(dtr){
    if(dtr){
      this.dtrService.getReadingByDTRId(dtr.id, true).subscribe(successResponse =>{
        let result = <any>successResponse;
        if(result && result.status === 200){
          let existingReading = result.body;
          if(existingReading){
            let alertResponse = this.globalResources.errorAlert("Initial Reading(S/R) for DTR <br><strong>" + dtr.dtrName + "</strong> exists!!!.");
            alertResponse.then(result =>{
              this.dtrInitialReadAdd.dtr = undefined;
            });
          }
        }
      },errorResponse =>{
        console.log(errorResponse);
      });
    }
  }

  dtrInitialReadingChanged(){
    this.calculateDifference();
  }

  errorInReading: boolean;
  calculateDifference(){
    let currentReading = Number.parseFloat(this.dtrInitialReadAdd.currReading);
		this.dtrInitialReadAdd.prevReading = currentReading;
    let previousReading = Number.parseFloat(this.dtrInitialReadAdd.prevReading);
    if(currentReading !== null && currentReading !== undefined  && previousReading !== null && previousReading !== undefined && currentReading >= previousReading){
			this.errorInReading = false;
			let difference = currentReading - previousReading;
			this.dtrInitialReadAdd.readingDiff = difference;
			this.dtrInitialReadAdd.readingDiff = Math.round(this.dtrInitialReadAdd.readingDiff * 100) / 100;
			this.dtrInitialReadAdd.meterConsumption = difference * this.dtrInitialReadAdd.dtr.overallMF;
      this.dtrInitialReadAdd.meterConsumption = Math.round(this.dtrInitialReadAdd.meterConsumption * 100) / 100;
      if(this.dtrInitialReadAdd.assUnit){
        this.dtrInitialReadAdd.totalConsumption = this.dtrInitialReadAdd.meterConsumption + this.dtrInitialReadAdd.assUnit;
      }else{
        this.dtrInitialReadAdd.totalConsumption = this.dtrInitialReadAdd.meterConsumption;
      }
		}else{
			this.errorInReading = true;
		}
  }

  dtrInitialReadingDateChanged(){
    this.makeCustomReadingDate(this.dtrInitialReadAdd.currReadingDate);
  }

  makeCustomReadingDate(currReadingDate){
    this.dtrInitialReadAdd.currReadingDateInString = this.globalResources.makeDateAsDD_MM_YYYY(currReadingDate);
  }

  dtrAssessmentUnitChanged(){
    if(this.dtrInitialReadAdd.assUnit){
      this.dtrInitialReadAdd.totalConsumption = this.dtrInitialReadAdd.meterConsumption + this.dtrInitialReadAdd.assUnit;
    }else{
      this.dtrInitialReadAdd.totalConsumption = this.dtrInitialReadAdd.meterConsumption;
    }
  }

  submitClicked(dtrInitialReadAddForm){
    if(this.globalResources.validateForm(dtrInitialReadAddForm)){
      this.submitButtonClicked = true;
      this.calculateDifference();
      this.makeCustomReadingDate(this.dtrInitialReadAdd.currReadingDate);
      // new flow in which prev reading & its date is same as current reading
      this.dtrInitialReadAdd.dtrId = this.dtrInitialReadAdd.dtr.id;
      this.dtrInitialReadAdd.zoneId = this.dtrInitialReadAdd.zone.id;
      this.dtrInitialReadAdd.feederId = this.dtrInitialReadAdd.feeder.id;
      this.dtrInitialReadAdd.groupNo1 = this.dtrInitialReadAdd.feeder.groupNo;
      this.dtrInitialReadAdd.mf = this.dtrInitialReadAdd.dtr.overallMF;
      this.dtrInitialReadAdd.meterNo = this.dtrInitialReadAdd.dtr.dtrMeterNo;
      this.dtrInitialReadAdd.readerNo1 = this.dtrInitialReadAdd.dtr.billingRDNo;
      this.dtrInitialReadAdd.prevReadingDateInString = this.dtrInitialReadAdd.currReadingDateInString;
      this.submitButtonClicked = false;
      console.log(this.dtrInitialReadAdd);
      this.addDTRInitialRead(dtrInitialReadAddForm);
    }
  }

  addDTRInitialRead(dtrInitialReadAddForm){
    this.submitButtonClicked = true;
    this.dtrService.addDTRRead(this.dtrInitialReadAdd, this.user.username).subscribe(successResponese =>{
      this.submitButtonClicked = false;
      let alertResponse = this.globalResources.successAlert("DTR initial read added successfully");
      alertResponse.then(result =>{
        this.clearPartialData();
        this.globalResources.resetValidateForm(dtrInitialReadAddForm);
      });
    }, errorResponse =>{
      console.log(errorResponse);
      this.submitButtonClicked = false;
      let alertResponse = this.globalResources.errorAlert(errorResponse.error.errorMessage);
      alertResponse.then(result =>{
        console.log("alert result", result);
      });
    });
  }

  
  resetClicked(dtrInitialReadAddForm){
    this.globalResources.resetValidateForm(dtrInitialReadAddForm);
    this.clearPartialData()
  }

  clearPartialData(){
    this.errorInReading = false;
    this.dtrInitialReadAdd.prevReading = undefined;
		this.dtrInitialReadAdd.prevReadingDateInString = undefined;
    this.dtrInitialReadAdd.currReading = undefined;
    this.dtrInitialReadAdd.currReadingDate = undefined;
		this.dtrInitialReadAdd.currReadingDateInString = undefined;
    this.dtrInitialReadAdd.assUnit = undefined;
		this.dtrInitialReadAdd.mf = undefined;
		this.dtrInitialReadAdd.meterNo = undefined;
		this.dtrInitialReadAdd.readingDiff = undefined;
		this.dtrInitialReadAdd.meterConsumption = undefined;
		this.dtrInitialReadAdd.totalConsumption = undefined;
    this.dtrInitialReadAdd.readerNo1 = undefined;
    // this.dtrList.splice(this.dtrList.indexOf(this.dtrInitialReadAdd.dtr.id),1);
    this.dtrInitialReadAdd.dtr = undefined;
  }

}