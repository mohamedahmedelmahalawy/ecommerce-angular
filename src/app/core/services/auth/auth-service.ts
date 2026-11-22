import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthInterface, SignInInterface } from '../../interfaces/auth.interface';

@Service()
export class AuthService {
  private _httpClient = inject(HttpClient);

  signUp(data: AuthInterface): Observable<any> {
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', data);
  }
  signIn(data: SignInInterface): Observable<any> {
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', data);
  }
}
