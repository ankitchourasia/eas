import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './modules/login/login.module';
import { GlobalResources } from './utility/global.resources';
import { GlobalConstants } from './utility/global.constants';
import { HttpModule } from '@angular/http';
import { CanActivateAuthGuard } from './guards/can-activate.authguard';
import { GlobalConfiguration } from './utility/global-configuration';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    LoginModule,
    AppRoutingModule
  ],
  providers: [ 
    GlobalResources,
    GlobalConstants,
    GlobalConfiguration,
    CanActivateAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
