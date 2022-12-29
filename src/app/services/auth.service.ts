import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { iResponse, LoginInterface, RegisterInterface } from '../models/auth.interface'
import { UserInterface } from '../models/user.interface'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http: HttpClient) {
  }

  login(body: LoginInterface): Observable<iResponse<UserInterface>> {
    return this._http.post<iResponse<UserInterface>>('/login', body)
  }

  register(body: RegisterInterface): Observable<iResponse<{ token: string }>> {
    return this._http.post<iResponse<{ token: string }>>('/registration', body)
  }
}
