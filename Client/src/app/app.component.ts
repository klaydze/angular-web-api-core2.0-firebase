import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AppService } from './app.service';
import { AppAuthService } from './appauth.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '.Net Core Web Api 2.0 with Firebase Authentication';
  requestToken: string;

  user = {
    email: '{email registered in firebase}',
    password: '{password of the email registered in firebase}'
  };

  constructor(private _webApiService: AppService,
              private _appAuthService: AppAuthService) { }

  signInWithGoogle(): void {
    this._appAuthService.signInWithGoogle()
                              .then((res) => {
                                  res.user.getIdToken(true)
                                            .then((token) => {
                                                          this._webApiService.getNetCoreWebApi(token)
                                                              .subscribe(res => {
                                                                console.log('Response from web api: ' + JSON.stringify(res));
                                                              });
                                                      });

        // this._router.navigate(['dashboard']);
      })
    .catch((err) => console.log(err));
  }

  signInWithEmail(): void {
    this._appAuthService.signInWithUsernamePassword(this.user.email, this.user.password)
                          .then((res) => {
                              res.getIdToken(true)
                                        .then((token) => {
                                                      this._webApiService.getNetCoreWebApi(token)
                                                            .subscribe(res => {
                                                              console.log('Response from web api: ' + JSON.stringify(res));
                                                            });
                                                    });
 
        // this._router.navigate(['dashboard']);
      })
      .catch((err) => console.log('error: ' + err));
  }

  ngOnInit() {
    if (!environment.firebaseConfig.apiKey || !environment.firebaseConfig.authDomain) {
      console.error('Api key and authDomain are missing. You may find this from Firebase project settings)');
      return;
    }
  }
}
