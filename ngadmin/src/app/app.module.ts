import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelModule } from './panel/panel.module';
import { LoginModule } from './login/login.module';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InvestsModule } from './panel/invests/invests.module';
import { PolandMapModule } from './panel/poland-map/poland-map.module';
import { ArticlesModule } from './panel/articles/articles.module';
import { RotorModule } from './panel/rotor/rotor.module';
import { ContactsModule } from './panel/contacts/contacts.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PanelModule,
    LoginModule,
    BrowserAnimationsModule,
    InvestsModule,
    PolandMapModule,
    ArticlesModule,
    RotorModule,
    ContactsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
