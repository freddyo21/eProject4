import { Component, OnInit, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-view-bill-products',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './view-bill-products.component.html',
  styleUrls: ['./view-bill-products.component.scss'],
})
export class ViewBillProductsComponent implements OnInit {
  dataplayedColumns: string[] = [
    'name',
    'category',
    'price',
    'quantity',
    'total',
  ];
  dataSource: any;
  data: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<ViewBillProductsComponent>
  ) { }

  ngOnInit() {
    this.data = this.dialogData.data;
    if (typeof this.data === "object") {
      this.dataSource = JSON.parse(this.data.productDetails);
      console.log(this.data);
    }
  }
}
