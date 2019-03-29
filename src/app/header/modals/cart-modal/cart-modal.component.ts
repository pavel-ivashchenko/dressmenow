
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit {

  public cartData: any; // TODO interface
  public currencyIdx: any; // TODO interface

  constructor(
    public dialogRef: MatDialogRef<CartModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { currencyIdx: Observable<number>, items: any }) { } // TODO interface

  ngOnInit() {
    this.cartData = this.data.items;
    this.currencyIdx = this.data.currencyIdx;
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
