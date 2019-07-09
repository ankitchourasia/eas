import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaginationServiceModule } from "./pagination/pagination-service.module";
import { ZoneServiceModule } from "./zone/zone-service.module";
import { SubstationServiceModule } from "./substation/substation-service.module";
import { LoginServiceModule } from "./login/login-service.module";

@NgModule({
    imports: [
        CommonModule,
        LoginServiceModule,
        ZoneServiceModule,
        SubstationServiceModule,
        PaginationServiceModule
    ],
    providers: [
        // DOMUtility,
        // UtilityService
    ]
  })
  export class EasServicesModule { }
  