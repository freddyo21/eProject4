import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GlobalConstants } from '../../shared/global-constants';
import { SnackbarService } from '../../services/snackbar.service';
import { UserService } from '../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatTableModule
  ],
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
})
export class ManageUserComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'contactNumber', 'status'];
  dataSource: any;
  responseMessage: any;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private SnackbarService: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tableData();
  }
  tableData() {
    this.userService.getUsers().subscribe({
      next: (response: any) => {
        this.dataSource = new MatTableDataSource(response);
      },
      error: (error: any) => {
        console.log(error.error?.message);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.SnackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onChange(status: any, id: any) {
    var data = {
      status: status.toString(),
      id: id,
    };
    this.userService.update(data).subscribe({
      next: (response: any) => {
        this.responseMessage = response?.message;
        this.SnackbarService.openSnackBar(this.responseMessage, 'success');
      },
      error: (error: any) => {
        //console.log(error.error?.message);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          //alert("status is updated successfully");

          this.responseMessage = GlobalConstants.genericError;
        }
        this.SnackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    });
  }
}
