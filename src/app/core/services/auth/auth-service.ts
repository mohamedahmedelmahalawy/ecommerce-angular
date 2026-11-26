import { HttpClient } from '@angular/common/http';
import { inject, PLATFORM_ID, Service } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthInterface, SignInInterface } from '../../interfaces/auth.interface';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Service()
export class AuthService {
  userData: BehaviorSubject<any> = new BehaviorSubject(null);

  private _httpClient = inject(HttpClient);
  private platForm: object = inject(PLATFORM_ID);
  private _router = inject(Router);

  constructor() {
    if (isPlatformBrowser(this.platForm)) {
      if (localStorage.getItem('token')) {
        this.saveUserData();
      }
    }
  }

  signUp(data: AuthInterface): Observable<any> {
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', data);
  }
  signIn(data: SignInInterface): Observable<any> {
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', data);
  }
  saveUserData() {
    let data = jwtDecode(<string>JSON.stringify(localStorage.getItem('token')));
    this.userData.next(data);
  }
  signOut() {
    localStorage.removeItem('token');
    this.userData.next(null);
    this._router.navigate(['/login']);
  }
}
