
import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { GlobalCurrency } from '@app/shared/interfaces';
import { IAppState } from '@app/core/store/state';
import { CartModalItem } from './interfaces';
import { cartDialogMockData } from './models';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartModalComponent implements OnInit {

  public cartData: CartModalItem[] = cartDialogMockData;
  public totalAmount = 0;
  public currency$: Observable<GlobalCurrency> = this.store.select(state => state.currency);

  constructor(
    private store: Store<IAppState>,
    private dialogRef: MatDialogRef<CartModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {}) { }

  ngOnInit() {
    this.totalAmount = this.cartData.reduce((acc, item) => acc + item.price * item.qty, 0);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
