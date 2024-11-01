import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: "home", redirectTo: "/", pathMatch: "full" },
  { path: "", component: HomeComponent },
  // { path: "**", component: HomeComponent },
];
