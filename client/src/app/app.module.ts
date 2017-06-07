import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {UserApplicationRoutingModule} from "./user-application/user-application-routing.module";
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {UserApplicationComponent} from "./user-application/user-application.component";
import {LoginComponent} from "./login/login.component";
import {LearnComponent} from './learn/learn.component';
import { CreateComponent } from './create/create.component';
import { FocusDirective } from './focus.directive';
import {ReversePipe} from "./pipes/reverse.pipe";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserApplicationComponent,
    LearnComponent,
    CreateComponent,
    FocusDirective,
    ReversePipe,
  ],
  imports: [
    ReactiveFormsModule,
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
