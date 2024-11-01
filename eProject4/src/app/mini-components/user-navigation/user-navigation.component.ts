import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LoginComponent } from '../../login/login.component';
import { SignupComponent } from '../../signup/signup.component';
import { ForgotPasswordComponent } from '../../forgot-password/forgot-password.component';

@Component({
  selector: 'app-user-navigation',
  standalone: true,
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './user-navigation.component.html',
  styleUrl: './user-navigation.component.scss'
})
export class UserNavigationComponent {
  isLoggedIn = false;
  username: string | undefined;

  @ViewChild('user_list_btn')
  userListBtn!: ElementRef;

  constructor(
    private dialog: MatDialog,
  ) { }

  change() {
    console.log(this.userListBtn.nativeElement.matMenuTriggerFor);
  }

  handleLoginAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(LoginComponent, dialogConfig);
  }
  handleSignupAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(SignupComponent, dialogConfig);
  }
  handleforgotPasswordAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(ForgotPasswordComponent, dialogConfig);
  }
}
