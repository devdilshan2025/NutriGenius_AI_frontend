import { Component, OnInit } from '@angular/core';
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
export class DashboardComponent implements OnInit {
  userName: string = "Dilshan"; // පස්සේ මේක DB එකෙන් ගමු
  aiAdvice: string = "Loading your health advice...";
  
  // Chat Bot එකට අදාළ දත්ත
  userMessage: string = "";
  chatHistory: { role: string, text: string }[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    // පේජ් එක ලෝඩ් වෙද්දීම AI Advice එක ගේනවා
    this.loadInitialAdvice();
  }

  loadInitialAdvice() {
    // දැනට ලොගින් වුණු ඊමේල් එක දාමු (පස්සේ මේක Session එකෙන් ගමු)
    const email = "dilshan@example.com"; 

    this.userService.getAiAdvice(email).subscribe({
      next: (res: string) => { 
        this.aiAdvice = res;
        // මුලින්ම එන AI Advice එකත් චැට් එකේ පේන්න දාමු
        this.chatHistory.push({ role: 'ai', text: res });
      },
      error: (err: any) => { 
        this.aiAdvice = "ඔබේ සෞඛ්‍ය උපදෙස් ලබා ගැනීමට නොහැකි විය.";
        console.error("AI Advice Error:", err);
      }
    });
  }

  sendMessage() {
    if (!this.userMessage.trim()) return;

    // 1. යූසර්ගේ මැසේජ් එක චැට් එකට එකතු කරනවා
    this.chatHistory.push({ role: 'user', text: this.userMessage });
    
    const currentMsg = this.userMessage;
    this.userMessage = ""; // Input එක clear කරනවා

    // 2. AI Chat එකට කතා කරන ලොජික් එක (දැනට පොඩි reply එකක් දාමු)
    // පස්සේ කාලෙක Backend එකේ AI Chat Endpoint එකට මේක සම්බන්ධ කරමු
    setTimeout(() => {
      this.chatHistory.push({ 
        role: 'ai', 
        text: "මම ඔබේ ප්‍රශ්නය විශ්ලේෂණය කරමින් සිටිමි. ඉක්මනින්ම ඔබට පිළිතුරු ලබා දෙන්නම්!" 
      });
    }, 1000);
  }
}