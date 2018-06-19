import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/internal/Observable';

/**
 * Application authentication service
 */
@Injectable()
export class AppAuthService {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private _angularFirebaseAuth: AngularFireAuth) {
    this.user = _angularFirebaseAuth.authState;

    this.user.subscribe((user) => {
      if (user) {
        this.userDetails = user;
      } else {
        this.userDetails = null;
      }
    });
  }

  /**
   * Sign in using your google account
   */
  signInWithGoogle() {
    return this._angularFirebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  signInWithTwitter() {
    return this._angularFirebaseAuth.auth.signInWithPopup(
      new firebase.auth.TwitterAuthProvider()
    );
  }

  signInWithFacebook() {
    return this._angularFirebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    );
  }

  /**
   * Sign in using your email and password
   * @param email Email address registered in firebase authentication
   * @param password Password of the registered email address from firebase authentication
   */
  signInWithUsernamePassword(email: string, password: string) {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);

    return this._angularFirebaseAuth.auth.signInWithCredential(credential);
  }

  isLoggedIn(): boolean {
    if (this.userDetails == null ) {
        return false;
      } else {
        return true;
      }
    }

    logout(): void {
      this._angularFirebaseAuth.auth.signOut()
      .then((res) => {
        console.log(res);
        // this._route.navigate(['/']
      });
    }
}
