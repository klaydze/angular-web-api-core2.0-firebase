import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { AppAuthService } from './appauth.service';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [AppService, AppAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
