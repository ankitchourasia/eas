import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './modules/login/login.module';
import { GlobalResources } from './utility/global.resources';
import { GlobalConstants } from './utility/global.constants';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    AppRoutingModule
  ],
  providers: [ 
    GlobalResources,
    GlobalConstants
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
