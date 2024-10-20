import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { NotificationsService } from '../../services/notifications/notifications.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @ViewChild('toastContainer', { read: ViewContainerRef }) toastContainer!: ViewContainerRef;
  
  name: string = '';
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService : AuthService, private notifService : NotificationsService) { }

  register() {
    this.notifService.success('This is a success message!', this.toastContainer);
    if (this.name && this.email && this.password) {
      this.authService.register(this.name, this.email, this.password).subscribe({
        next: (res) => {
          console.log(res);
          this.error = '';
          this.name = '';
          this.email = '';
          this.password = '';
        },
        error: (error) => {
          this.error = error.error.message;
        }
      });
    } else {
      this.error = 'All fields are required';
    }
  }

}
