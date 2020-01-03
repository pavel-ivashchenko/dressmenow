
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { CurrencyService } from '@app/core/services';
import { environment } from '@env/environment';

fdescribe('CurrencyService', () => {

  const BASE_URL: string = environment.baseURL;
  let currencyService: CurrencyService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        CurrencyService,
        HttpClientTestingModule
      ]
    });
    currencyService = TestBed.get(CurrencyService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

});
