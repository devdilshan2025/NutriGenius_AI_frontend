import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'NutriGenius';

  // Router එක මෙතනට inject කරනවා (public කළේ HTML එකේ පාවිච්චි කරන්න පුළුවන් වෙන්න)
  constructor(public router: Router) {}
}