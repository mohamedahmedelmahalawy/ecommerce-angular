import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../../core/services/auth/auth-service';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  isLoggedIn: boolean = false;
  constructor(private _authService: AuthService) {
    this._authService.userData.subscribe((res) => {
      console.log('Hello from Navbar', res);
      if (res) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  logOut() {
    this._authService.signOut();
  }
}
