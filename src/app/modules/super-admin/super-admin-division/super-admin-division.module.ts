import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminDivisionViewComponent } from './super-admin-division-view/super-admin-division-view.component';
import { SuperAdminDivisionAddComponent } from './super-admin-division-add/super-admin-division-add.component';
import { DivisionComponentModule } from '@eas-components/division/division-component.module';

@NgModule({
  declarations: [SuperAdminDivisionViewComponent, SuperAdminDivisionAddComponent],
  imports: [
    CommonModule,
    DivisionComponentModule
  ]
})
export class SuperAdminDivisionModule { }
