import { Component, OnInit } from '@angular/core';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { GlobalConstants } from '@eas-utility/global.constants';
import { GlobalResources } from '@eas-utility/global.resources';

@Component({
  selector: 'eas-admin-ht-consumer-33kv-read-upload',
  templateUrl: './admin-ht-consumer-33kv-read-upload.component.html',
  styleUrls: ['./admin-ht-consumer-33kv-read-upload.component.css']
})
export class AdminHTConsumer33KVReadUploadComponent implements OnInit {

  file: any;
  fileName: any;
  month : string;
  year : string;
  billMonth: any;
  user: any;
  zoneList: any;
  searchButtonClicked: boolean;
  uploadButtonClicked: boolean;

  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants,
    private feederService: FeederService, private zoneService: ZoneService) { }

  ngOnInit() {
  }

  getZoneListByDivisionId(divisionId){
    this.zoneList = [];
    this.zoneService.getZonesByDivisionId(divisionId, false).subscribe(successResponse =>{
      this.zoneList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  fileChanged(event) {
    // this.fileName = this.fileName.split("\\").pop();
    // this.file = null;
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      this.file = fileList[0];
      this.fileName = this.file.name;
      console.log(this.file);
    }
  }

  uploadClicked(){
    this.uploadButtonClicked = true;
    this.billMonth = this.month + '-' + this.year;
    this.feederService.uploadHT33KVReadFile(this.file, this.billMonth).subscribe(
      successResponse =>{
        let result = <any>successResponse;
        // this.file.upload = result.body;
        this.globalResources.successAlert("File uploaded successfully");
        this.uploadButtonClicked = false;
      },
      errorResponse =>{
        console.log(errorResponse);
        this.uploadButtonClicked = false;
        if(errorResponse.status === 417){
          let data = errorResponse.error;
          this.globalResources.errorAlert("BillFile Already uploaded for bill month : " + data.billMonth);
        }else{
          let errorMessage = errorResponse.error.message;
          this.globalResources.errorAlert("Some error occured while uploading bill file.Try Again !<br>"+ errorMessage);
        }
      }
    );
  }

}
