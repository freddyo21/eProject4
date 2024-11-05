import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { UserNavigationComponent } from '../mini-components/user-navigation/user-navigation.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BestSellerComponent } from '../best-seller/best-seller.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    UserNavigationComponent,
    BestSellerComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.checkToken().subscribe({
      next: () => {
        this.router.navigate(['/cafe/dashboard']);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    });
  }
}
