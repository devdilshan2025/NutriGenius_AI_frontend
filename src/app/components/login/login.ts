import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router, RouterModule } from '@angular/router'; // RouterModule මෙතන තියෙන්න ඕනේ

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // මෙතනට RouterModule අනිවාර්යයි
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  loginData = { email: '', password: '' };

  constructor(private userService: UserService, private router: Router) {}

  onLogin() {
    this.userService.loginUser(this.loginData).subscribe({
      next: (res: string) => {
        if (res === "Login Successful!") {
          // Dashboard එකට Navigate කරනවා
          this.router.navigate(['/dashboard']); 
        } else {
          alert(res);
        }
      },
      error: (err) => alert("Backend error!")
    });
  }
}