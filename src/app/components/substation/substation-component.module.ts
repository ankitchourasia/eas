import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubstationAddComponent } from './substation-add/substation-add.component';
import { SubstationViewComponent } from './substation-view/substation-view.component';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from '@eas-directives/directive.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule
  ],
  declarations: [SubstationAddComponent, SubstationViewComponent],
  exports: [SubstationAddComponent, SubstationViewComponent]
})
export class SubstationComponentModule { }
