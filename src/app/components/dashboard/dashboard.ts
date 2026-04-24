import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router'; // Router එක Import කරන්න

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatScrollContainer') private chatContainer!: ElementRef;

  userName: string = "Loading..."; 
  userWeight: number = 0;
  userHeight: number = 0;
  userAge: number = 0;
  bmiValue: number = 0;
  bmiStatus: string = "Calculating...";

  messages: { type: string, text: string }[] = [];
  newMessage: string = "";

  constructor(private userService: UserService, private router: Router) {} // Router එක Inject කරන්න

  ngOnInit() {
    // 1. localStorage එකෙන් Login වුණු යූසර්ගේ Email එක ගන්නවා
    const email = localStorage.getItem('userEmail'); 

    if (email) {
      // 2. Backend එකෙන් එම Email එකට අදාළ දත්ත ලබාගැනීම
      this.userService.getUserDetails(email).subscribe({
        next: (data: any) => {
          this.userName = data.name;
          this.userWeight = data.weight;
          this.userHeight = data.height;
          this.userAge = data.age;
          this.calculateBMI(); 
        },
        error: (err: any) => {
          console.error("User Details Error:", err);
        }
      });

      // 3. එම Email එකට අදාළ Personalized AI Advice එක ලබාගැනීම
      this.userService.getPersonalizedAdvice(email).subscribe({
        next: (advice: string) => {
          this.messages.push({ type: 'ai', text: advice });
        },
        error: (err: any) => {
          console.error("AI Advice Error:", err);
        }
      });

    } else {
      // 4. Email එකක් නැත්නම් (Login වෙලා නැත්නම්) ආපහු Login Page එකට යවනවා
      this.router.navigate(['/login']);
    }
  }

  private calculateBMI() {
    if (this.userHeight > 0) {
      const heightInMeters = this.userHeight / 100;
      this.bmiValue = parseFloat((this.userWeight / (heightInMeters * heightInMeters)).toFixed(1));
      
      if(this.bmiValue < 18.5) this.bmiStatus = "Underweight";
      else if(this.bmiValue < 25) this.bmiStatus = "Normal Weight";
      else if(this.bmiValue < 30) this.bmiStatus = "Overweight";
      else this.bmiStatus = "Obese";
    }
  }

  ngAfterViewChecked() { this.scrollToBottom(); }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  sendToAi() {
    if (!this.newMessage.trim()) return;

    const userText = this.newMessage;
    this.messages.push({ type: 'user', text: userText });
    this.newMessage = ""; 

    this.userService.getAiChat(userText).subscribe({
      next: (res: string) => {
        this.messages.push({ type: 'ai', text: res });
      },
      error: (err: any) => {
        this.messages.push({ type: 'ai', text: "AI එකට සම්බන්ධ වීමට නොහැකි විය." });
      }
    });
  }
}