import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable()
export class AppService {
  private _apiUrl = 'http://localhost:5000/api/values';

  constructor(private _http: HttpClient) { }

  /**
   * Call .Net Core Web Api
   * @param token Bearer token to be use as authorization
   */
  getNetCoreWebApi(token: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json')
                      .set('Authorization', `Bearer ${token}`);

    return this._http.get(this._apiUrl, { headers: headers })
                .pipe(
                  catchError(this.handleError)
                );
  }

  private handleError(err: HttpErrorResponse) {
    console.log('App Service: ' + err.message);
    return Observable.throw(err.message);
  }
}
