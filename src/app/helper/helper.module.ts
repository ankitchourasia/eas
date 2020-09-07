import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { ErrorsComponent } from './error/error.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoaderComponent, ErrorsComponent],
  exports: [LoaderComponent, ErrorsComponent],
})
export class HelperModule { }
