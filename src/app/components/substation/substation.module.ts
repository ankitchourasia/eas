import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubstationAddComponent } from './substation-add/substation-add.component';
import { SubstationViewComponent } from './substation-view/substation-view.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SubstationAddComponent, SubstationViewComponent]
})
export class SubstationModule { }
