import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-workouts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workouts.html',
  styleUrl: './workouts.css'
})
export class WorkoutsComponent implements OnInit {
  workoutPlan: string = "";
  isLoading: boolean = true;
  userBmiStatus: string = "";

  constructor(private userService: UserService) {}

  ngOnInit() {
    const email = localStorage.getItem('userEmail');
    
    if (email) {
      // යූසර්ගේ BMI එක අනුව Plan එකක් AI එකෙන් ඉල්ලනවා
      this.userService.getWorkoutPlan(email).subscribe({
        next: (res: any) => {
          // Backend එකෙන් මේ වගේ JSON එකක් එනවා කියලා මම හිතනවා: { plan: "...", status: "..." }
          this.workoutPlan = res.plan; 
          this.userBmiStatus = res.status;
          this.isLoading = false;
        },
        error: (err) => {
          console.error("Workout Plan Error:", err);
          this.workoutPlan = "සමාවෙන්න, Workout Plan එක ලබා ගැනීමට නොහැකි විය. පසුව නැවත උත්සාහ කරන්න.";
          this.isLoading = false;
        }
      });
    } else {
      // Email එක නැත්නම් Dashboard එකට හෝ Login එකට යැවිය යුතුයි
      this.isLoading = false;
    }
  }
}