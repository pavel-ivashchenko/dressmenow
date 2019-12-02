
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';

import { UnauthorizedError } from '@app/shared/interfaces';
import { environment } from '@env/environment';

import { TestStore } from '@testing/test-store';
import { UserService } from '@app/core/services';
import { IAppState, IUserState, initialAppState } from '@app/core/store/state';

fdescribe('UserService', () => {

  const BASE_URL: string = environment.baseURL;
  const TEST_USER_ID = 123;
  const TEST_USER = {
    ...initialAppState.user,
    id: TEST_USER_ID
  };
  const UNAUTHORIZED_ERROR_MSG = 'Unauthorised';
  let userService: UserService,
      httpTestingController: HttpTestingController,
      store: TestStore<IAppState>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        UserService,
        HttpClientTestingModule,
        { provide: Store, useClass: TestStore }
      ]
    });

    userService = TestBed.get(UserService);
    httpTestingController = TestBed.get(HttpTestingController);

  });

  beforeEach(inject([Store], (testStore: TestStore<IAppState>) => {
    store = testStore;
    store.setState({
      ...initialAppState,
      user: { ...initialAppState.user, id: TEST_USER.id }
    });
  }));

  it('should retrieve a specific user with via the getUser() method', () => {
    userService.getUser()
      .subscribe(
        (res: IUserState) => { expect(res.id).toBe(TEST_USER_ID, 'An id of the retrieved user is not correct'); }
      );
    const req = httpTestingController.expectOne(`${ BASE_URL }/user`);

    expect(req.request.method).toEqual('GET');

    req.flush({ status: 200, body: TEST_USER });
  });

  it('should get an error with the 401 status via the getUser() method', () => {
    userService.getUser()
      .subscribe(
        (res: UnauthorizedError) => { expect(res.message).toBe(UNAUTHORIZED_ERROR_MSG); }
      );
    const req = httpTestingController.expectOne(`${ BASE_URL }/user`);

    expect(req.request.method).toEqual('GET');

    req.flush({ status: 401, body: new Error('Unauthorised') });
  });

  it('should retrieve the current user from the store via the getCurrentUser() method', () => {

    store.setState({
      ...initialAppState,
      user: { ...initialAppState.user, id: TEST_USER.id }
    });

    userService.getCurrentUser()
      .subscribe(
        (res: IUserState) => {
          expect(res.id).toBe(TEST_USER_ID, 'An id of the retrieved user is not correct');
        }
      );

  });

  afterEach(() => {
    httpTestingController.verify();
  });

});
