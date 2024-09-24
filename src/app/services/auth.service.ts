import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { environment } from '../../environments/environment.development';

import { IAuth, IAuthToLogin, IAuthToRegister, IAuthToUpdate, IMessage } from '../interfaces/auth_interface';
import { LS } from '../enum/enums';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl = environment.baseUrl;
  public _user!: IAuth;

  // RELATED WITH ADMIN privileges
  public variableEmitter: boolean = false;
  public authChanged: EventEmitter<boolean> = new EventEmitter(this.variableEmitter); // to display/hide link admin on navbar

  get userProps() {
    return { ...this._user };
  }

  get getToken() {
    const token = localStorage.getItem(LS.LS_TOKEN_SYSTEM) || '';
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  constructor(
    private http: HttpClient,
  ) {}

  // TO NOTIFY ALL COMPONENTS ARE LISTENING THIS PROP
  triggerAuthChanged(): void {
    this.variableEmitter = !this.variableEmitter;
    this.authChanged.next(this.variableEmitter);
  }

  // SIGN IN
  login( dataToLogin: IAuthToLogin ): Observable<IAuth|any> {
    const url = `${this._baseUrl}/auth/sign-in`;

    return this.http.post<IAuth>( url, dataToLogin )
      .pipe(
        tap( resp => {
          if ( resp.uid ) {
            localStorage.setItem(LS.LS_TOKEN_SYSTEM, resp.token!);
            this.triggerAuthChanged();
          }
        } ),
        map( resp => resp ),
        catchError( err => of(err.error) ),
      );

  };

  // SIGN UP
  register(dataToRegister: IAuthToRegister): Observable<IAuth|any> {
    const url = `${this._baseUrl}/auth/sign-up`;

    return this.http.post<IMessage>( url, dataToRegister, { headers: this.getToken } )
      .pipe(
        map( resp => resp ),
        catchError( err => of(err.error) )
      )
  };

  // RENEW
  revalidateToken(): Observable<boolean>  {
    const url = `${this._baseUrl}/auth/renew`;

    return this.http.get<IAuth>( url, { headers: this.getToken } )
      .pipe(
        map( resp => {
          if ( resp.uid ) {
            localStorage.setItem( LS.LS_TOKEN_SYSTEM, resp.token! );
            const { name, uid, ...restUser } = resp!;
            this._user = {
              uid,
              name,
              ...restUser,
            }
          }
          return true;
        }),
        catchError( err => of(false) )
      )
  };

  // FETCH ONE
  fetchOneUser(uid: number): Observable<IAuth> {
    const url = `${this._baseUrl}/auth/${uid}`;

    return this.http.get<IAuth>( url, { headers: this.getToken } )
      .pipe(
        map( resp => resp ),
        catchError( err => of(err.error) )
      );
  };

  // UPDATE
  updateUserClient( uid: number, data: IAuthToUpdate ): Observable<IMessage> {
    const url = `${this._baseUrl}/auth/${uid}`;

    return this.http.patch<IMessage>( url, data, { headers: this.getToken } )
      .pipe(
        map( resp => resp ),
        catchError( err =>  of(err.error) )
      );
  }
  
  // LOGOUT
  logout(): Observable<any> {
    const url = `${this._baseUrl}/auth/logout`;

    return this.http.get<any>( url, { headers: this.getToken } )
      .pipe(
        tap( resp => {
          if ( resp.ok ) {
            localStorage.removeItem(LS.LS_TOKEN_SYSTEM);
            this.triggerAuthChanged();
          };
        } ),
        map( resp => resp ),
        catchError( err => of(err.error) )
      )

  };
   
}
