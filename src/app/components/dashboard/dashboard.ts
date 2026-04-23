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

  userName: string = "Dilshan"; 
  
  // HTML එකේ තියෙන නම: messages
  messages: { type: string, text: string }[] = [];
  
  // HTML එකේ තියෙන නම: newMessage
  newMessage: string = "";

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadInitialAdvice();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  loadInitialAdvice() {
    const email = "dilshan@example.com"; 
    this.userService.getAiAdvice(email).subscribe({
      next: (res: string) => { 
        this.messages.push({ type: 'ai', text: res });
      },
      error: (err: any) => { 
        this.messages.push({ type: 'ai', text: "Welcome! I'm your AI Health Genius. How can I help you today?" });
      }
    });
  }

  // HTML එකේ තියෙන නම: sendToAi
  sendToAi() {
    if (!this.newMessage.trim()) return;

    this.messages.push({ type: 'user', text: this.newMessage });
    const userText = this.newMessage;
    this.newMessage = ""; 

    setTimeout(() => {
      this.messages.push({ 
        type: 'ai', 
        text: "Analyzing your request... I'll provide your fitness advice shortly!" 
      });
    }, 1000);
  }
}