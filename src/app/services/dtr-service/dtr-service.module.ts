import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DtrService } from './dtr.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DtrService],
  exports: [DtrService],
  
})
export class DtrServiceModule { }
