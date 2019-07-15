import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DtrService } from './dtr.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DtrService],
  providers: [DtrService],
  
})
export class DtrServiceModule { }
