import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeederAddComponent } from './feeder-add/feeder-add.component';
import { FeederViewComponent } from './feeder-view/feeder-view.component';
import { DirectiveModule } from '@eas-directives/directive.module';
import { FeederReadingAddComponent } from './feeder-reading-add/feeder-reading-add.component';
import { FeederReadingViewComponent } from './feeder-reading-view/feeder-reading-view.component';
import { FeederAbsentReadingViewComponent } from './feeder-absent-reading-view/feeder-absent-reading-view.component';
import { FeederTndLossReportComponent } from './feeder-tnd-loss-report/feeder-tnd-loss-report.component';
import { FeederTndLossReportWithoutHtComponent } from './feeder-tnd-loss-report-without-ht/feeder-tnd-loss-report-without-ht.component';
import { FeederAtncLossReportComponent } from './feeder-atnc-loss-report/feeder-atnc-loss-report.component';
import { FeederViewTndLossReportComponent } from './feeder-view-tnd-loss-report/feeder-view-tnd-loss-report.component';
import { FeederViewTndLossReportWithoutHtComponent } from './feeder-view-tnd-loss-report-without-ht/feeder-view-tnd-loss-report-without-ht.component';
import { FeederViewAtncLossReportComponent } from './feeder-view-atnc-loss-report/feeder-view-atnc-loss-report.component';
import { FeederMappingAddComponent } from './feeder-mapping-add/feeder-mapping-add.component';
import { FeederInitialReadAddComponent } from './feeder-initial-read-add/feeder-initial-read-add.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule,
  ],
  declarations: [
    FeederAddComponent, 
    FeederViewComponent, 
    FeederReadingAddComponent, 
    FeederReadingViewComponent, 
    FeederAbsentReadingViewComponent, 
    FeederTndLossReportComponent, 
    FeederTndLossReportWithoutHtComponent, 
    FeederAtncLossReportComponent, 
    FeederViewTndLossReportComponent, 
    FeederViewTndLossReportWithoutHtComponent, 
    FeederViewAtncLossReportComponent, 
    FeederMappingAddComponent, 
    FeederInitialReadAddComponent
  ],
  exports:[
    FeederAddComponent, 
    FeederViewComponent,
    FeederReadingAddComponent, 
    FeederReadingViewComponent, 
    FeederAbsentReadingViewComponent,
    FeederTndLossReportComponent, 
    FeederTndLossReportWithoutHtComponent, 
    FeederAtncLossReportComponent,
    FeederViewTndLossReportComponent,
    FeederMappingAddComponent, 
    FeederInitialReadAddComponent
  ]
})
export class FeederComponentModule { }
