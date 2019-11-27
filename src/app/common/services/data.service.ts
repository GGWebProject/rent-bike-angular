import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from '../entities';
import {catchError, concatMap, tap} from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import {IAccessToken} from '../interfaces/iaccess-token';

const backendUrl: string = 'http://localhost:3000';
const usersUrl: string = `${backendUrl}/users`;
const jwtSecretKey: string = 'json-server-auth-123456';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  public getUsers(): Observable<Array<User>> {
    return this.http
      .get<Array<User>>(usersUrl)
      .pipe(
        tap(
          data => console.log(data),
        )
      );
  }

  // private getUser(): Observable<User> {
  //   // return this.http.get<User>()
  // }

  // return access token

  public registerUser(user: User): Observable<any> {
    return this.getAccessToken(user);
  }

  // return access token

  public loginUser(user: User): Observable<any> {
    return this.getAccessToken(user).pipe(
      concatMap(
        (data: IAccessToken) => {
          console.log(data.accessToken);
          console.log(jwt_decode(data.accessToken));
          return of('');
        }
      )
    );
  }

  private getAccessToken(user: User): Observable<IAccessToken> {

    // if user has name - it`s register request, else it is login request
    const requestUrl: string = `${backendUrl}/${user.userName ? 'register' : 'login'}`;
    console.log(requestUrl);
    const body: string = JSON.stringify({...user});
    const options: object = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(`${requestUrl}`, body, options)
      .pipe(
        tap(
          data => console.dir(data),
        ),
        catchError(err => of(err))
      );
  }
}
