import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  apiErrorMessage: string = '';
  callingApi: boolean = false;
  private _cdr = inject(ChangeDetectorRef);
  private _authService = inject(AuthService);
  router = inject(Router);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^[A-Z][a-z0-9]{3,5}$/),
    ]),
  });

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  login() {
    console.log(this.loginForm);

    if (this.loginForm.valid) {
      this.apiErrorMessage = '';
      this.callingApi = true;
      //call API
      this._authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          // console.log(res);
          // console.log(res.message);
          // console.log(res.token);
          // console.log(res.user);
          localStorage.setItem('token', res.token);
          this._authService.saveUserData();
          this.callingApi = false;
          this._cdr.detectChanges();
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log(err);
          this.apiErrorMessage = err.error.message;
          this.callingApi = false;
          this._cdr.detectChanges();
        },
        complete: () => {},
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
