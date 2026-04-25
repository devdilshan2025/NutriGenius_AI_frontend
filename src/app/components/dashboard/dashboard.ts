import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatScrollContainer') private chatContainer!: ElementRef;

  // Variables - මුලින්ම "---" දානවා Layout එක කැත නොවී තියාගන්න
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
      // 1. User Details ලබාගැනීම
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

      // 2. මුල්ම Personalized AI Advice එක ලබාගැනීම
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

  logout() {
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }

  private calculateBMI() {
    // අගයන් අංක වලට හරවාගෙන බලනවා (Number conversion)
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