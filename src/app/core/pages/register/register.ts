import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth-service';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  apiErrorMessage: string = '';
  callingApi: boolean = false;
  private _cdr = inject(ChangeDetectorRef);
  private _authService = inject(AuthService);
  router = inject(Router);

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^[A-Z][a-z0-9]{3,5}$/),
      ]),
      rePassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^[A-Z][a-z0-9]{3,5}$/),
      ]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    },
    this.confirmPasswordValidation,
  );

  get nameControl() {
    return this.registerForm.get('name');
  }

  get emailControl() {
    return this.registerForm.get('email');
  }

  get passwordControl() {
    return this.registerForm.get('password');
  }

  get rePasswordControl() {
    return this.registerForm.get('rePassword');
  }

  get phoneControl() {
    return this.registerForm.get('phone');
  }

  confirmPasswordValidation(formData: any) {
    if (formData.get('password').value === formData.get('rePassword').value) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

  register() {
    console.log(this.registerForm);

    //Updates only the controls you provide. Other controls remain unchanged.
    // this.registerForm.patchValue({
    //   name: 'sayed',
    //   email: 'sayed@gmail.com',
    //   password: 'Ana123',
    //   confirmPassword: 'Ana123',
    //   phone: '01012345678',
    // });

    //Updates all controls and requires you to provide a value for every control.
    //set secific values for all controls
    // this.registerForm.setValue({
    //   name: 'sayed',
    //   email: 'sayed@gmail.com',
    //   password: this.registerForm.get('password')?.value,
    //   confirmPassword: this.registerForm.get('confirmPassword')?.value,
    //   phone: this.registerForm.get('phone')?.value,
    // });

    if (this.registerForm.valid) {
      this.apiErrorMessage = '';
      this.callingApi = true;
      //call API
      this._authService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.callingApi = false;
          this._cdr.detectChanges();
          this.router.navigate(['/login']);
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
      this.registerForm.markAllAsTouched();
    }
  }
}
