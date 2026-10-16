import { isPlatformBrowser } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Common } from './services/common';

@Component({
  imports: [RouterOutlet, RouterLink],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  loggedUserName: string = '';
  common = inject(Common);

  constructor() {
    this.common.$onLogin.subscribe({
      next: () => {
        this.readLoggedUserData();
      }
    });
  }
  readLoggedUserData() {
      const local = localStorage.getItem('enqueryApp');
      if (local != null) {
        this.loggedUserName = local;
      }
  }
}
