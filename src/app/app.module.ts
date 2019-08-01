import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { appRoutingModule } from './app-routing.module';
import { LoginModule } from './modules/login/login.module';
import { GlobalResources } from './utility/global.resources';
import { GlobalConstants } from './utility/global.constants';
import { HttpModule } from '@angular/http';
import { CanActivateAuthGuard } from './guards/can-activate.authguard';
import { GlobalConfiguration } from './utility/global-configuration';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthorizationInterceptor } from './interceptors/authorization.interceptor';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from '@eas-directives/directive.module';
// import { AppRoutingModule } from './app-routing.module';
// import { EasServicesModule } from '@eas-services/eas-service.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    LoginModule,
    DirectiveModule,
    // EasServicesModule,
    appRoutingModule
    // AppRoutingModule
  ],
  providers: [ 
    GlobalResources,
    GlobalConstants,
    GlobalConfiguration,
    CanActivateAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
