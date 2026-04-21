import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from './service/user.service';
import { LoginComponent } from './components/login/login'; // මචං path එක හරියටම තියෙනවද බලන්න

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, LoginComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.css'
})
export class AppComponent {
  // මුලින්ම පේන්න ඕනේ Login එක නිසා 'login' දැම්මා
  currentPage: 'login' | 'register' = 'login'; 

  user = {
    name: '',
    email: '',
    password: '',
    age: null,
    weight: null,
    height: null
  };

  constructor(private userService: UserService) {}

  // Page එක මාරු කරන්න ලේසි වෙන්න මේක පාවිච්චි කරනවා
  togglePage(page: 'login' | 'register') {
    this.currentPage = page;
  }

  onRegister() {
    this.userService.registerUser(this.user).subscribe({
      next: (res) => {
        alert("User Registered Successfully!");
        // සාර්ථක වුණාම ලොගින් වෙන්න ආයෙත් Login එකට යවනවා
        this.currentPage = 'login'; 
      },
      error: (err) => {
        alert("Registration Failed!");
        console.error(err);
      }
    });
  }
}