import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.authService.loadUserInfoFromStorage();
    console.log(this.authService.getUserInfo());
  }

}
