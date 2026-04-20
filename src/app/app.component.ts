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
  // මෙතන weight සහ height වලට 0 වෙනුවට null දැම්මා 
  // එතකොට තමයි HTML එකේ placeholder එක ලස්සනට පේන්නේ
  user = {
    name: '',
    email: '',
    password: '',
    weight: null, 
    height: null
  };

  constructor(private userService: UserService) {}

  onRegister() {
    this.userService.registerUser(this.user).subscribe({
      next: (res) => {
        alert("User Registered Successfully!");
        console.log(res);
        // Register වුණාට පස්සේ form එක clear කරන්න ඕනේ නම් මේක පාවිච්චි කරන්න පුළුවන්:
        // this.user = { name: '', email: '', password: '', weight: null, height: null };
      },
      error: (err) => {
        alert("Registration Failed! Check Console.");
        console.error(err);
      }
    });
  }
}