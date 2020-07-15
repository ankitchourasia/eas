import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginModule } from './modules/login/login.module';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConstants } from '@eas-utility/global.constants';
import { CanActivateAuthGuard } from './guards/can-activate.authguard';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthorizationInterceptor } from './interceptors/authorization.interceptor';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { GlobalDOMUtility } from '@eas-utility/global-dom-utility';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ManageHttpInterceptor } from './interceptors/managehttp.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    LoginModule,
    // appRoutingModule
    AppRoutingModule
  ],
  providers: [ 
    GlobalResources,
    GlobalConstants,
    GlobalDOMUtility,
    GlobalConfiguration,
    CanActivateAuthGuard,
    // { provide: ErrorHandler, useClass: ModuleErrorHandler},
    { provide: HTTP_INTERCEPTORS, useClass: ManageHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
