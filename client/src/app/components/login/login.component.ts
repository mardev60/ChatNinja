import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      this.error = "Merci de remplir les champs requis.";
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => this.handleLoginSuccess(response),
      error: () => this.error = "Email ou mot de passe erronés."
    });
  }

  private handleLoginSuccess(response: any) {
    const res = response as { token: string };
    if (res.token) {
      this.authService.setToken(res.token);
      this.fetchUserInfos();
    }
  }

  private fetchUserInfos() {
    this.authService.getUserInfos().subscribe({
      next: (response) => {
        this.authService.setUserInfo(response);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.error = "Impossible de récupérer les informations utilisateur.";
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }
}