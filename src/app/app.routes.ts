import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { DashboardComponent } from './components/dashboard/dashboard';
import { WorkoutsComponent } from './components/workouts/workouts'; // Import කරගන්න
import { DietPlanComponent } from './components/diet-plan/diet-plan'; // Import කරගන්න

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'workouts', component: WorkoutsComponent }, // අලුත් Route එක
  { path: 'diet-plan', component: DietPlanComponent }, // අලුත් Route එක
  { path: '**', redirectTo: 'login' } 
];