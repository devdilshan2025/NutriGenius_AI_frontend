import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router'; // RouterLink මෙතනින් අයින් කළා
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule], // මෙතනින් RouterLink අයින් කළා (Warning එක නැති වෙයි)
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit, AfterViewChecked, AfterViewInit {
  @ViewChild('chatScrollContainer') private chatContainer!: ElementRef;

  userName: string = "Loading..."; 
  userWeight: any = "---";
  userHeight: any = "---";
  userAge: any = "---";
  bmiValue: any = "---";
  bmiStatus: string = "Calculating...";

  messages: { type: string, text: string }[] = [];
  newMessage: string = "";
  isLoading: boolean = false; 

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    const email = localStorage.getItem('userEmail'); 

    if (email) {
      this.userService.getUserDetails(email).subscribe({
        next: (data: any) => {
          this.userName = data.name;
          this.userWeight = data.weight;
          this.userHeight = data.height;
          this.userAge = data.age;
          this.calculateBMI(); 
        },
        error: (err: any) => console.error("User Details Error:", err)
      });

      this.userService.getPersonalizedAdvice(email).subscribe({
        next: (advice: string) => {
          this.messages.push({ type: 'ai', text: advice });
        },
        error: (err: any) => console.error("AI Advice Error:", err)
      });

    } else {
      this.router.navigate(['/login']);
    }
  }

  ngAfterViewInit() {
    this.renderChart();
  }

  renderChart() {
    new Chart('weightChart', {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Weight (kg)',
          data: [78, 77.2, 76.5, 75], 
          borderColor: '#dc3545',
          backgroundColor: 'rgba(220, 53, 69, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: '#dc3545'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, 
        scales: {
          y: { 
            grid: { color: 'rgba(255, 255, 255, 0.1)' }, 
            ticks: { color: '#aaa' },
            beginAtZero: false 
          },
          x: { 
            grid: { display: false }, 
            ticks: { color: '#aaa' } 
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  logout() {
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }

  private calculateBMI() {
    const weight = Number(this.userWeight);
    const height = Number(this.userHeight);

    if (height > 0 && weight > 0) {
      const heightInMeters = height / 100;
      this.bmiValue = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
      
      if(this.bmiValue < 18.5) this.bmiStatus = "Underweight";
      else if(this.bmiValue < 25) this.bmiStatus = "Normal Weight";
      else if(this.bmiValue < 30) this.bmiStatus = "Overweight";
      else this.bmiStatus = "Obese";
    }
  }

  sendToAi() {
    if (!this.newMessage.trim() || this.isLoading) return;

    const userText = this.newMessage;
    this.messages.push({ type: 'user', text: userText });
    this.newMessage = ""; 
    this.isLoading = true; 

    this.userService.getAiChat(userText).subscribe({
      next: (res: string) => {
        this.messages.push({ type: 'ai', text: res });
        this.isLoading = false; 
      },
      error: (err: any) => {
        this.messages.push({ type: 'ai', text: "AI එකට සම්බන්ධ වීමට නොහැකි විය." });
        this.isLoading = false;
      }
    });
  }

  ngAfterViewChecked() { this.scrollToBottom(); }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
}