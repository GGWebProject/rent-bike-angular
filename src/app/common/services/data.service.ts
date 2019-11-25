import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../entities';
import {tap} from 'rxjs/operators';

const backendUrl: string = 'http://localhost:3000';
const usersUrl: string = `${backendUrl}/users`;

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

  // return access token

  public registerUser(user: User): Observable<any> {
    return this.getAccessToken(user);
  }

  // return access token

  public loginUser(user: User): Observable<any> {
    return this.getAccessToken(user);
  }

  private getAccessToken(user: User): Observable<any> {

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
          data => console.log(data),
        )
      );
  }
}
