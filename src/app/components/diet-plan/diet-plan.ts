import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-diet-plan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diet-plan.html',
  styleUrl: './diet-plan.css'
})
export class DietPlanComponent implements OnInit { // නම 'DietPlanComponent' ලෙස වෙනස් කළා
  dietPlan: string = "";
  isLoading: boolean = true;
  userBmiStatus: string = "";

  constructor(private userService: UserService) {}

  ngOnInit() {
    const email = localStorage.getItem('userEmail');
    if (email) {
      this.userService.getDietPlan(email).subscribe({
        next: (res: any) => {
          this.dietPlan = res.plan;
          this.userBmiStatus = res.status;
          this.isLoading = false;
        },
        error: (err: any) => {
          console.error("Diet Plan Error:", err);
          this.dietPlan = "සමාවෙන්න, Diet Plan එක ලබා ගැනීමට නොහැකි විය.";
          this.isLoading = false;
        }
      });
    }
  }
}