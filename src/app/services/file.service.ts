import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

import { environment } from '../../environments/environment.development';

import { ICountAndTotalFile, IFile } from '../interfaces/file_interface';
import { IMessage } from '../interfaces/auth_interface';

import { LS } from '../enum/local_storage';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  private _baseUrl = environment.baseUrl;

  get getToken() {
    const token = localStorage.getItem(LS.LS_TOKEN_SYSTEM) || '';
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  constructor(
    private http: HttpClient,
  ) {}

  // NEW
  saveNewFile(data: FormData): Observable<IMessage|any> {
    const url = `${this._baseUrl}/file`;

    return this.http.post<IMessage>( url, data, { headers: this.getToken } )
      .pipe(
        map( resp => resp ),
        catchError( err => of(err.error) )
      );
  }

  downloadFile(fileId: number): Observable<any> {
    const url = `${this._baseUrl}/file/download/${fileId}`;

    return this.http.get<any>(
      url,
      {    
        responseType: 'blob' as 'json', // Ensure responseType is 'blob' for binary data    
        headers: this.getToken,
      }
    )
      .pipe(
        map( resp => resp ),
        catchError( err => of(err.error) )
      );
  }

  fetchAllFilesPaginated(
    limit: number,
    offset: number,
  ): Observable<ICountAndTotalFile> {
    const url = `${this._baseUrl}/file`;

    let params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset);

    return this.http.get<ICountAndTotalFile>( url, { params, headers: this.getToken } )
      .pipe(
        map( resp => resp ),
        catchError( err => of(err.error) )
      );
  };

  editFileName(
    fileId: number,
    name: string
  ): Observable<IMessage|any> {
    const url = `${this._baseUrl}/file/${fileId}`;

    return this.http.patch<IMessage>( url, {name}, { headers: this.getToken } )
      .pipe(
        map( resp => resp ),
        catchError( err => of(err.error) )
      );
  }

  findOneFileById(fileId: number|string): Observable<IFile> {
    const url = `${this._baseUrl}/file/${fileId}`;

    return this.http.get<IFile>( url)
      .pipe(
        map( resp => resp ),
        catchError( err => of(err.error) )
      );
  }

}
