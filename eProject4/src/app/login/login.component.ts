import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalConstants } from '../shared/global-constants';
import { MatInputModule } from '@angular/material/input';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = true;
  loginForm: any = FormGroup;
  responseMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<LoginComponent> = Inject(MatDialogRef)
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [
        null,
        Validators.required,
        // Validators.pattern(GlobalConstants.emailRegex),
      ],
      password: [null, Validators.required],
    });
  }

  handleSubmit() {
    if (this.loginForm.invalid) {
      this.snackbarService.openSnackBar('Please enter valid credentials', "Error");
      return;
    }

    var formData = this.loginForm.value;
    var data = {
      username: formData.username,
      password: formData.password,
    };

    this.userService.login(data)
      .subscribe({
        next: (response: any) => {
          this.dialogRef.close();
          localStorage.setItem('token', response.token);
          alert("Successfully Login");
          this.router.navigate(['/dashboard']);
        },
        error: (error: { error: { message: any } }) => {
          this.responseMessage = error.error?.message || GlobalConstants.genericError;
          alert(this.responseMessage + ' ' + GlobalConstants.error);
          this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
        }
      });
  }
}
