import { Component } from '@angular/core';
import { GlobalConstants } from '../shared/global-constants';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  forgotPasswordForm: any = FormGroup;
  responseMessage: any;

  registerSucess: boolean = false;
  isButtonVisible = true;

  constructor(
    private formBulider: FormBuilder,
    private userService: UserService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<ForgotPasswordComponent>
  ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBulider.group({
      email: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.emailRegex)],
      ],
    });
  }

  handleSubmit() {
    // var formData = this.forgotPasswordForm.value;
    // var data = {
    //   email: formData.email,
    // };

    // this.userService.forgotPassword(data).subscribe(
    //   (response: any) => {
    //     this.dialogRef.close();
    //     this.responseMessage = GlobalConstants.emailSend;
    //     this.snackbarService.openSnackBar(this.responseMessage, '');
    //   },
    //   (error: { error: { message: any } }) => {
    //     if (error.error?.message) {
    //       this.responseMessage = error.error?.message;
    //     } else {
    //       this.responseMessage = GlobalConstants.genericError;
    //     }
    //     this.snackbarService.openSnackBar(
    //       this.responseMessage,
    //       GlobalConstants.error
    //     );
    //   }
    // );
    // this.registerSucess = true;
    // this.isButtonVisible = false;

    if (this.forgotPasswordForm.invalid) {
      this.snackbarService.openSnackBar('Please enter a valid email address', GlobalConstants.error);
      return;
    }

    const formData = this.forgotPasswordForm.value;
    const data = { email: formData.email };

    this.userService.forgotPassword(data).subscribe({
      next: (response: any) => {
        this.dialogRef.close();
        this.responseMessage = GlobalConstants.emailSend;
        this.snackbarService.openSnackBar(this.responseMessage, '');
        this.registerSucess = true;
        this.isButtonVisible = false;
      },
      error: (error: { error: { message: any } }) => {
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    });
  }
}
