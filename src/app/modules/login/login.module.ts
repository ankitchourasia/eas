import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule  } from '@angular/forms';
import { LoginServiceModule } from '@eas-services/login/login-service.module';
import { ZoneServiceModule } from '@eas-services/zone/zone-service.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginServiceModule,
    ZoneServiceModule,
    LoginRoutingModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
