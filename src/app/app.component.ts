import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from './service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.css'
})
export class AppComponent {
  user = { name: '', email: '', password: '', weight: 0, height: 0 };
  constructor(private userService: UserService) {}

  onRegister() {
    this.userService.registerUser(this.user).subscribe({
      next: (res) => alert("User Registered Successfully!"),
      error: (err) => {
        alert("Registration Failed!");
        console.error(err);
      }
    });
  }
}