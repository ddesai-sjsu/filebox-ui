import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { urlConstants } from '../../rest-api-configuration';
import { UserResponse, DeleteResponse, AllUsers } from './models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private baseUrl: string;
public userDetails = new Subject();
  constructor(private http: HttpClient) {
    this.baseUrl = environment.url;
   }
  getUserDetails(email): Observable<UserResponse> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      sessionId: sessionStorage.getItem('token')
  });
    return this.http.get<UserResponse>(`${this.baseUrl}${urlConstants.GET_USER}/${email}`, {headers: httpHeaders});
  }

  deleteFile(email, filename):  Observable<DeleteResponse> {
    return this.http.put<DeleteResponse>(`${this.baseUrl}${urlConstants.DELETE}/${email}/${filename}`, '');
  }

  getAllUsers():Observable<AllUsers>{
    return this.http.get<AllUsers>(`${this.baseUrl}${urlConstants.GET_USER}`);
  }

}
