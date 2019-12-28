
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { MyAccountNavMenuItems, MockOrders, MockPurchases, MockWishes, MockLoves } from './models';

@Component({
  selector: 'app-my-account-home',
  templateUrl: './my-account-home.component.html',
  styleUrls: ['./my-account-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyAccountHomeComponent implements OnInit {

  public navMenuItems = MyAccountNavMenuItems;
  public isLoading = false;

  public wishes = MockWishes;
  public loves = MockLoves;
  public ordersBlockData = {
    items: MockOrders,
    mainTitle: 'ЗАМОВЛЕННЯ',
    noItemsTitle: 'Поки що немає замовлень!',
    btnTitle: 'ПЕРЕГЛЯНУТИ ЗАМОВЛЕННЯ'
  };
  public purchasesBlockData = {
    items: MockPurchases,
    mainTitle: 'ПОКУПКИ',
    noItemsTitle: 'Товари, що ви придбали будуть доступні тут для перегляду',
    btnTitle: 'ПЕРЕГЛЯНУТИ ПОКУПКИ'
  };
  public lovesBlockData = {
    items: MockLoves,
    mainTitle: 'УПОДОБАННЯ',
    noItemsTitle: 'Тут можна буде переглянути товари, які були уподобані вами',
    btnTitle: 'ПЕРЕГЛЯНУТИ УПОДОБАННЯ'
  };

  constructor() { }

  ngOnInit() { }

  public test() { }

}
