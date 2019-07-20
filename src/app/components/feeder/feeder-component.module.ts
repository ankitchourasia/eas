import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeederAddComponent } from './feeder-add/feeder-add.component';
import { FeederViewComponent } from './feeder-view/feeder-view.component';
import { DirectiveModule } from '@eas-directives/directive.module';
import { FeederReadingAddComponent } from './feeder-reading-add/feeder-reading-add.component';
import { FeederReadingViewComponent } from './feeder-reading-view/feeder-reading-view.component';
import { FeederAbsentReadingViewComponent } from './feeder-absent-reading-view/feeder-absent-reading-view.component';
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
    FeederViewComponent, 
    FeederReadingAddComponent, 
    FeederReadingViewComponent, 
    FeederAbsentReadingViewComponent
  ],
  exports:[
    FeederAddComponent, 
    FeederViewComponent,
    FeederReadingAddComponent, 
    FeederReadingViewComponent, 
    FeederAbsentReadingViewComponent
  ]
})
export class FeederComponentModule { }
