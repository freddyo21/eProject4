import { Component } from '@angular/core';
import { GlobalConstants } from '../shared/global-constants';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-signup',
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
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  password = true;
  confirmPassword = true;
  signupForm: any = FormGroup;
  responseMessage: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private UserService: UserService,
    private SnackbarService: SnackbarService,
    public dialogRef: MatDialogRef<SignupComponent> //private ngxService:NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, Validators.required],
      contactNumber: [null, [Validators.required]],
      password: [null, Validators.required],
      confirmPassword: [null, [Validators.required]],
    });
  }
  validateSubmit() {
    if (
      this.signupForm.controls['password'].value !=
      this.signupForm.controls['confirmPassword'].value
    ) {
      return true;
    } else {
      return false;
    }
  }

  handleSubmit() {
    var formDate = this.signupForm.value;
    var data = {
      name: formDate.name,
      email: formDate.email,
      contactNumber: formDate.contactNumber,
      password: formDate.password,
    };

    this.UserService.signup(data).subscribe({
      next: (response: any) => {
        this.dialogRef.close();
        this.responseMessage = GlobalConstants.signupSuccess;
        this.SnackbarService.openSnackBar(this.responseMessage, '');
        this.router.navigate(['/cafe/login']);
      },
      error: (error: { error: { message: any } }) => {
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        alert(`${this.responseMessage} ${GlobalConstants.error}`);
        this.SnackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    });
  }
}
