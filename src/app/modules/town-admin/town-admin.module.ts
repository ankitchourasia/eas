import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TownAdminHomeComponent } from './town-admin-home/town-admin-home.component';
import { TownAdminMenuService } from './town-admin-menu.service';
import { TownAdminRoutingModule } from './town-admin-routing.module';
import { HeaderComponentModule } from '@eas-components/header/header-component.module';
import { TownAdminComponent } from './town-admin.component';



@NgModule({
  imports: [
    CommonModule,
    HeaderComponentModule,
    TownAdminRoutingModule
  ],
  declarations: [
    TownAdminComponent,
    TownAdminHomeComponent
  ],
  providers: [
    TownAdminMenuService
  ]
})
export class TownAdminModule { }
