import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from '../entities';
import {catchError, concatMap, tap} from 'rxjs/operators';
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
        tap((user: User) => console.log(user))
      );
  }

  // return access token

  public registerUser(user: User): Observable<IAccessToken> {
    const requestUrl: string = `${backendUrl}/register`;
    const body: string = JSON.stringify({...user});
    const options: object = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post(`${requestUrl}`, body, options)
      .pipe(
        tap(data => console.log(data)),
        catchError(err => of(err))
      );
  }

  // return access token

  public loginUser(user: User): Observable<IAccessToken> {
    const requestUrl: string = `${backendUrl}/login`;
    const body: string = JSON.stringify({...user});
    const options: object = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post(`${requestUrl}`, body, options)
      .pipe(
        tap(data => console.log(data)),
        catchError(err => of(err))
      );
  }
}
