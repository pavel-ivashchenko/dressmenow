
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';

import { TestStore } from '@testing/test-store';
import { UserService } from '@app/core/services';
import { IAppState } from '@app/core/store/state';
import { User } from '@app/shared/interfaces';

describe('UserService', () => {

  let userService: UserService,
      httpTestingController: HttpTestingController,
      store: TestStore<IAppState>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: Store, useClass: TestStore }
      ]
    });

    userService = TestBed.get(UserService);
    httpTestingController = TestBed.get(HttpTestingController);

  });

  beforeEach(inject([Store], (testStore: TestStore<IAppState>) => {
    store = testStore;
    // store.setState({ items: [], filter: 'ALL' });
  }));

});
