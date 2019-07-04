import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubstationAddComponent } from './substation-add/substation-add.component';
import { SubstationViewComponent } from './substation-view/substation-view.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [SubstationAddComponent, SubstationViewComponent],
  exports: [SubstationAddComponent, SubstationViewComponent]
})
export class SubstationModule { }
