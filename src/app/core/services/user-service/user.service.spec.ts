
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';

import { UnauthorizedError } from '@app/shared/interfaces';
import { environment } from '@env/environment';

import { TestStore } from '@testing/test-store';
import { UserService } from '@app/core/services';
import { IAppState, IUserState, initialAppState } from '@app/core/store/state';

describe('UserService', () => {

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

  it('should return an object in response', () => {
    userService.getUser()
      .subscribe(
        (res: IUserState) => {
          expect(res).toBeTruthy('No response from server on request for a user');
          expect(res).toEqual(jasmine.any(Object), 'Server response is not an object');
        }
      );

    const req = httpTestingController.expectOne(`${ BASE_URL }/user`);
    expect(req.request.method).toEqual('GET');
    req.flush({ status: 200, body: TEST_USER });
  });

  it('should retrieve a user', () => {
    userService.getUser()
      .subscribe(
        (res: IUserState) => {
          expect(res.id).toBe(TEST_USER_ID, 'An id of a user is not correct');
        }
      );

    const req = httpTestingController.expectOne(`${ BASE_URL }/user`);
    expect(req.request.method).toEqual('GET');
    req.flush({ status: 200, body: TEST_USER });
  });

  it('should get an error with 401 status', () => {
    userService.getUser()
      .subscribe(
        (res: UnauthorizedError) => {
          console.log('asdfasdfa' + res.status);
          expect(res.message).toBe(UNAUTHORIZED_ERROR_MSG);
        }
      );

    const req = httpTestingController.expectOne(`${ BASE_URL }/user`);
    expect(req.request.method).toEqual('GET');
    req.flush({ status: 401, body: new Error('Unauthorised') });
  });

});
