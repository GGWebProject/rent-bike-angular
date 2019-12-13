import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User} from '../entities';
import {catchError, tap} from 'rxjs/operators';
import {IAccessToken} from '../interfaces/iaccess-token';

const backendUrl: string = 'http://localhost:3000';
const usersUrl: string = `${backendUrl}/users`;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getUsers(): Observable<Array<User>> {
    return this.http
      .get<Array<User>>(usersUrl)
      .pipe(
        tap(
          data => console.log(data),
        )
      );
  }

  public getUser(id): Observable<User> {
    const requestUrl: string = `${backendUrl}/users/${id}`;
    return this.http.get<User>(requestUrl)
      .pipe(
        catchError(err => throwError(err))
      );
  }

  // return access token

  public registerUser(user: User): Observable<IAccessToken | object> {
    const requestUrl: string = `${backendUrl}/register`;
    const body: string = JSON.stringify({...user});
    const options: object = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post(`${requestUrl}`, body, options)
      .pipe(
        catchError(err => throwError(err))
      );
  }

  // return access token

  public loginUser(user: User): Observable<IAccessToken | object> {
    const requestUrl: string = `${backendUrl}/login`;
    const body: string = JSON.stringify({...user});
    const options: object = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post(`${requestUrl}`, body, options)
      .pipe(
        catchError(err => throwError(err))
      );
  }
}
