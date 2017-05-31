import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {UserApplicationRoutingModule} from "./user-application/user-application-routing.module";
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {UserApplicationComponent} from "./user-application/user-application.component";
import {LoginComponent} from "./login/login.component";
import {LearnComponent} from './learn/learn.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserApplicationComponent,
    LearnComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    UserApplicationRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
