import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleAddComponent } from './circle-add/circle-add.component';
import { CircleViewComponent } from './circle-view/circle-view.component';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from '@eas-directives/directive.module';

@NgModule({
  declarations: [CircleAddComponent, CircleViewComponent],
  exports: [CircleAddComponent, CircleViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule
  ]
})
export class CircleComponentModule { }
