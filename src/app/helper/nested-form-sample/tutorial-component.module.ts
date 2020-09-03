import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveModule } from 'app/directives/directive.module';
import { IsolatedFormComponent } from './isolated-form.component';
import { NestedFormComponent } from './nested-form.component';
import { ReactiveFormComponent } from './reactive-form.component';
import { RootFormComponent } from './root-form.component';
import { FormStatusComponent } from './form-status.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectiveModule,
  ],
  declarations: [
    FormStatusComponent,
    IsolatedFormComponent,
    NestedFormComponent,
    ReactiveFormComponent,
    RootFormComponent
  ],
  exports: [
    FormStatusComponent,
    IsolatedFormComponent,
    NestedFormComponent,
    ReactiveFormComponent,
    RootFormComponent
  ],
})
export class NestedFormModule { }
