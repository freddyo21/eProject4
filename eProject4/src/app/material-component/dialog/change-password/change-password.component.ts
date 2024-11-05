import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { GlobalConstants } from '../../../shared/global-constants';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  oldPassword = true;
  newPassword = true;
  confirmPassword = true;
  changePasswordForm: any = FormGroup;
  responseMessage: any;

  constructor(
    private router: Router,
    private formBulider: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formBulider.group({
      oldPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    });
  }

  validateSubmit() {
    return this.changePasswordForm.controls['newPassword'].value !==
      this.changePasswordForm.controls['confirmPassword'].value;
  }

  handlePasswordChangeSubmit() {
    var formDate = this.changePasswordForm.value;
    var data = {
      oldPassword: formDate.oldPassword,
      newPassword: formDate.newPassword,
      confirmPassword: formDate.confirmPassword,
    };

    this.userService.changePassword(data).subscribe({
      next:(response: any) => {
        this.responseMessage = response?.message;
        this.dialogRef.close();
        //alert('Successfully Login');
        this.router.navigate(['/cafe/dashboard']);
        this.responseMessage = GlobalConstants.passwordChanged;
        this.snackbarService.openSnackBar(this.responseMessage, 'success');
      },
      error:(error) => {
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          //alert(this.responseMessage + ' ' + GlobalConstants.error);
          this.responseMessage = GlobalConstants.oldPasswordError;
          this.snackbarService.openSnackBar(
            this.responseMessage,
            GlobalConstants.error
          );
        }
      }
    });
  }
}
