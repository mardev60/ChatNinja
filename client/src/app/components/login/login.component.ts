import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  login() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    if (this.email && this.password) {
      console.log('Logging in with', this.email, this.password);
    } else {
      console.log('Username and password are required');
    }
  }
}
