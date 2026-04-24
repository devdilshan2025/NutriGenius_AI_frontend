import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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
          
          // 1. Login සාර්ථක වුණු යූසර්ගේ Email එක localStorage එකේ Save කරනවා
          localStorage.setItem('userEmail', this.loginData.email);

          // 2. ඊට පස්සේ Dashboard එකට Navigate කරනවා
          this.router.navigate(['/dashboard']); 
          
        } else {
          alert(res);
        }
      },
      error: (err) => alert("Backend error!")
    });
  }
}