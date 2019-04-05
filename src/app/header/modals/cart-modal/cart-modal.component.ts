
import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CartDialogData, CartModalItem } from '../../interfaces';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartModalComponent implements OnInit {

  public cartData: CartModalItem[];
  public currencyIndex: number;
  public currency: string;
  public totalAmount: number = 0;

  constructor(
    private dialogRef: MatDialogRef<CartModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: CartDialogData) { }

  ngOnInit() {
    if (this.dialogData && this.dialogData.items && this.dialogData.currencyObj ) {
      this.cartData = this.dialogData.items;
      this.currencyIndex = this.dialogData.currencyObj.currencyIndex;
      this.currency = this.dialogData.currencyObj.currency;
      this.totalAmount = this.cartData.reduce((acc, item) => { return acc + item.price * item.qty }, 0);
    }
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
