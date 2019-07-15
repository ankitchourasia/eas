import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaginationServiceModule } from "./pagination/pagination-service.module";
import { ZoneServiceModule } from "./zone/zone-service.module";
import { SubstationServiceModule } from "./substation/substation-service.module";
import { LoginServiceModule } from "./login/login-service.module";
import { FeederServiceModule } from "./feeder/feeder-service.module";
import { DtrServiceModule } from "./dtr-service/dtr-service.module";
import { RegionServiceModule } from "./region-service/region-service.module";
import { CircleServiceModule } from "./circle-service/circle-service.module";
import { DivisionServiceModule } from "./division-service/division-service.module";

@NgModule({
    imports: [
        CommonModule,
        LoginServiceModule,
        RegionServiceModule,
        CircleServiceModule,
        DivisionServiceModule,
        ZoneServiceModule,
        DtrServiceModule,
        FeederServiceModule,
        SubstationServiceModule,
        PaginationServiceModule
    ],
    providers: [
        // DOMUtility,
        // UtilityService
    ]
  })
  export class EasServicesModule { }
  