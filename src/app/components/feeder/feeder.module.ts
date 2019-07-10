import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeederAddComponent } from './feeder-add/feeder-add.component';
import { FeederViewComponent } from './feeder-view/feeder-view.component';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from '@eas-directives/directive.module';
import { FeederReadingAddComponent } from './feeder-reading-add/feeder-reading-add.component';
import { FeederReadingViewComponent } from './feeder-reading-view/feeder-reading-view.component';
import { FeederAbsentReadingViewComponent } from './feeder-absent-reading-view/feeder-absent-reading-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule
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
export class FeederModule { }
