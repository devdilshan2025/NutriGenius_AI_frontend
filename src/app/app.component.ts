import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // මේක අනිවාර්යයි
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: '../styles.css' // styles.css එකේ මේවා තියෙනවා නම් මෙහෙම දෙන්න
  // නැත්නම් app.component.css එකක් හදලා ඒකට මේවා දාලා './app.component.css' දෙන්න
})
export class AppComponent {
  title = 'nutri-genius-frontend';
}