import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeederAddComponent } from './feeder-add/feeder-add.component';
import { FeederViewComponent } from './feeder-view/feeder-view.component';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from '@eas-directives/directive.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule
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
