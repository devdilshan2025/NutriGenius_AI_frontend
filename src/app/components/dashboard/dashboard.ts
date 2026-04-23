import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatScrollContainer') private chatContainer!: ElementRef;

  userName: string = "Dilshan Bandara"; 
  userWeight: number = 72;
  userHeight: number = 178;
  bmiValue: number = 22.7;
  bmiStatus: string = "Normal Weight";

  messages: { type: string, text: string }[] = [];
  newMessage: string = "";

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.messages.push({ 
      type: 'ai', 
      text: "Hello Dilshan! Welcome to your NutriGenius dashboard. Based on your BMI, you are in the healthy range. How can I assist you with your diet or workout today?" 
    });
  }

  ngAfterViewChecked() { this.scrollToBottom(); }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  sendToAi() {
    if (!this.newMessage.trim()) return;
    this.messages.push({ type: 'user', text: this.newMessage });
    const userText = this.newMessage;
    this.newMessage = ""; 

    setTimeout(() => {
      this.messages.push({ 
        type: 'ai', 
        text: "Analyzing your request... As your AI Fitness Genius, I suggest focusing on lean proteins and consistent strength training this week." 
      });
    }, 1000);
  }
}