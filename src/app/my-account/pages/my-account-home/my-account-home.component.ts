
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-my-account-home',
  templateUrl: './my-account-home.component.html',
  styleUrls: ['./my-account-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyAccountHomeComponent implements OnInit {

  public isLoading = false;
  public wishes = [
    {
      href: '#',
      src: 'https://www.lulus.com/images/product/small-medium/4287110_588472.jpg',
      title: 'list #1'
    }, {
      href: '#',
      src: 'https://www.lulus.com/images/product/small-medium/4287110_588472.jpg',
      title: 'list #2'
    }
  ];
  public loves = [
    {
      href: '#',
      src: 'https://www.lulus.com/images/product/small-medium/4446470_390892.jpg'
    }, {
      href: '#',
      src: 'https://www.lulus.com/images/product/small-medium/4196710_844002.jpg'
    }
  ];
  public purchases = [
    {
      href: '#',
      src: 'https://www.lulus.com/images/product/small-medium/4446470_390892.jpg'
    }, {
      href: '#',
      src: 'https://www.lulus.com/images/product/small-medium/4196710_844002.jpg'
    }
  ];
  public orders = [
    {
      href: '#',
      src: 'https://www.lulus.com/images/product/small-medium/4446470_390892.jpg'
    }, {
      href: '#',
      src: 'https://www.lulus.com/images/product/small-medium/4196710_844002.jpg'
    }
  ];

  public navMenuItems = [
    { href: '#', uiName: 'ОГЛЯД АКАУНТУ' },
    { href: '#', uiName: 'ЗАМОВЛЕННЯ' },
    { href: '#', uiName: 'ПОКУПКИ' },
    { href: '#', uiName: 'УПОДОБАННЯ' },
    { href: '#', uiName: 'ОБРАНЕ' },
    { href: '#', uiName: 'РАХУНОК' },
    { href: '#', uiName: 'ПРОФІЛЬ' },
    { href: '#', uiName: '', subMenuItems: [
      { href: '#', uiName: 'Дані користувача' },
      { href: '#', uiName: 'Розміри' },
      { href: '#', uiName: 'Змінити пароль' }
    ] }
  ]

  constructor() { }

  ngOnInit() {
  }

  public test() { }

}
