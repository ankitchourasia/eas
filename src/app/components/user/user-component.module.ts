import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAddComponent } from './user-add/user-add.component';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from '@eas-directives/directive.module';

@NgModule({
  declarations: [UserAddComponent],
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule
  ],
  exports:[UserAddComponent]
})
export class UserComponentModule { }
