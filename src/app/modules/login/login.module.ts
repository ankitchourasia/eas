import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule  } from '@angular/forms';
import { LoginServiceModule } from '@eas-services/login/login-service.module';
import { DirectiveModule } from '@eas-directives/directive.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule,
    LoginServiceModule,
    LoginRoutingModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
