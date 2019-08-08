import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DivisionViewComponent } from './division-view/division-view.component';
import { DivisionAddComponent } from './division-add/division-add.component';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from '@eas-directives/directive.module';

@NgModule({
  declarations: [DivisionViewComponent, DivisionAddComponent],
  exports: [DivisionViewComponent, DivisionAddComponent],
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule
  ]
})
export class DivisionComponentModule { }
