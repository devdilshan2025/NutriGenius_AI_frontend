import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; 
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './register.html'
})
export class RegisterComponent {
  user = { name: '', email: '', password: '', age: null, weight: null, height: null };

  constructor(private userService: UserService, private router: Router) {}

  onRegister() {
    this.userService.registerUser(this.user).subscribe({
      next: (res: string) => {
        alert(res);
        if (res === "User Registered Successfully!") {
          this.router.navigate(['/login']);
        }
      },
      error: (err) => alert("Registration failed!")
    });
  }
}