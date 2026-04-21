import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private userService: UserService) {}

  onLogin() {
    console.log("Logging in with:", this.loginData);
    // දැනට ඇලර්ට් එකක් විතරක් දාමු වැඩද බලන්න
    alert("Login function coming soon! Email: " + this.loginData.email);
  }
}