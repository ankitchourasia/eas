import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminFeederAddComponent } from './admin-feeder-add/admin-feeder-add.component';
import { AdminFeederViewComponent } from './admin-feeder-view/admin-feeder-view.component';
import { AdminFeederReadingAddComponent } from './admin-feeder-reading-add/admin-feeder-reading-add.component';
import { AdminFeederReadingViewComponent } from './admin-feeder-reading-view/admin-feeder-reading-view.component';
import { AdminFeederAbsentReadingViewComponent } from './admin-feeder-absent-reading-view/admin-feeder-absent-reading-view.component';
import { FeederComponentModule } from '@eas-components/feeder/feeder-component.module';

@NgModule({
  imports: [
    CommonModule,
    FeederComponentModule,
  ],
  declarations: [
    AdminFeederAddComponent,
    AdminFeederViewComponent,
    AdminFeederReadingAddComponent,
    AdminFeederReadingViewComponent,
    AdminFeederAbsentReadingViewComponent,
  ]
})
export class AdminFeederModule { }
