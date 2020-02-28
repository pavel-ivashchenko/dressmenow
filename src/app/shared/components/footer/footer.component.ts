
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { MenuItems } from './models';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {

  public menuItems = MenuItems;

  constructor() { }

  ngOnInit() { }

  public onLanguageClick(languageName) { }

}
