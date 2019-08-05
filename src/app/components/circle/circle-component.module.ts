import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleAddComponent } from './circle-add/circle-add.component';
import { CircleViewComponent } from './circle-view/circle-view.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CircleAddComponent, CircleViewComponent],
  exports: [CircleAddComponent, CircleViewComponent],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class CircleComponentModule { }
