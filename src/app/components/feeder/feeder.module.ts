import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeederAddComponent } from './feeder-add/feeder-add.component';
import { FeederViewComponent } from './feeder-view/feeder-view.component';
import { DirectiveModule } from '@eas-directives/directive.module';
import { ZoneServiceModule } from '@eas-services/zone/zone-service.module';
import { PaginationServiceModule } from '@eas-services/pagination/pagination-service.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule,
    ZoneServiceModule,
    PaginationServiceModule
  ],
  declarations: [
    FeederAddComponent, 
    FeederViewComponent
  ],
  exports:[
    FeederAddComponent, 
    FeederViewComponent
  ]
})
export class FeederModule { }
