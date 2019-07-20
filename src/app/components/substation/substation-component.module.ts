import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubstationAddComponent } from './substation-add/substation-add.component';
import { SubstationViewComponent } from './substation-view/substation-view.component';
import { FormsModule } from '@angular/forms';
import { PaginationServiceModule } from '@eas-services/pagination/pagination-service.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationServiceModule
  ],
  declarations: [SubstationAddComponent, SubstationViewComponent],
  exports: [SubstationAddComponent, SubstationViewComponent]
})
export class SubstationComponentModule { }
