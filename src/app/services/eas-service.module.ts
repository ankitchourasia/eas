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
import { BillFileServiceModule } from "./bill-file-service/bill-file-service.module";
import { AuthenticationServiceModule } from "./authentication-service/authentication-service.module";
import { LogoutServiceModule } from "./logout-service/logout-service.module";
import { HTConsumerServiceModule } from "./ht-consumer-service/ht-consumer-service.module";

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
        BillFileServiceModule,
        HTConsumerServiceModule,
        PaginationServiceModule,
        LogoutServiceModule,
        AuthenticationServiceModule
    ],
    providers: [
        // DOMUtility,
        // UtilityService
    ]
  })
  export class EasServicesModule { }
  