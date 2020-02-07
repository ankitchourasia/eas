import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponentModule } from '@eas-components/header/header-component.module';
import { AdminFeederModule } from './admin-feeder/admin-feeder.module';
import { AdminExportModule } from './admin-export/admin-export.module';
import { AdminMenuService } from './admin-menu.service';

@NgModule({
  imports: [
    CommonModule,
    HeaderComponentModule,
    AdminExportModule,
    AdminFeederModule,
    AdminRoutingModule,
  ],
  declarations: [
    AdminComponent,
    AdminHomeComponent,
  ],
  providers: [
    AdminMenuService
  ]
})
export class AdminModule { }
