import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Common } from '../services/common';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  userLogin: any = {
    username: '',
    password: '',
  };

  router = inject(Router);
  common = inject(Common);

  onLogin() {
    if (this.userLogin.username == 'admin' && this.userLogin.password == '1111') {
      localStorage.setItem('enqueryApp', this.userLogin.username);
      this.common.$onLogin.next();
      this.router.navigateByUrl('/status');

    } else {
      alert('Please enter correct username and password');
    }
  }
}
