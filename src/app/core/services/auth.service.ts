import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private API_URL = 'http://localhost:8080/auth/';

  login(correo_electronico: string, contrasena: string): Observable<any>{
    return this.http.post(`${this.API_URL}login`, {correo_electronico,contrasena});
  }

}
