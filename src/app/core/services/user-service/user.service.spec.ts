
import { TestBed, inject } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';

import { TestStore } from '@testing/store.fixture';
import { environment } from '@env/environment';
import { UserService } from '@app/core/services';
import { IUserState, initialAppState } from '@app/core/store/state';
import { SetUser } from '@app/core/store/actions';

describe('UserService', () => {

  const BASE_URL: string = environment.baseURL;

  const TEST_USER_ID = 123;
  const TEST_USER = { ...initialAppState.user, id: TEST_USER_ID };
  const TEST_UNAUTHORIZED_MSG = { status: 401, statusText: 'Unauthorised' };

  let userService: UserService,
      httpTestingController: HttpTestingController,
      store: TestStore<IUserState>;

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

  describe('getUser()', () => {

    it('should retrieve a specific user with', () => {
      userService.getUser()
        .subscribe(
          (res: IUserState) => { expect(res.id).toBe(TEST_USER_ID, 'An id of the retrieved user is not correct'); }
        );
      const req = httpTestingController.expectOne(`${ BASE_URL }/user`);
      expect(req.request.method).toEqual('GET');
      req.flush({ status: 200, body: TEST_USER });
    });

    it('should get an error with the 401 status', () => {
      userService.getUser()
        .subscribe(
          _ => fail('should get an error with the 401 status'),
          (res: HttpErrorResponse) => {
            expect(res.status).toBe(TEST_UNAUTHORIZED_MSG.status);
            expect(res.statusText).toBe(TEST_UNAUTHORIZED_MSG.statusText);
          }
        );
      const req = httpTestingController.expectOne(`${ BASE_URL }/user`);
      expect(req.request.method).toEqual('GET');
      req.flush(null, TEST_UNAUTHORIZED_MSG);
    });

  });

  describe('getCurrentUser()', () => {

    beforeEach(inject([Store], (testStore: TestStore<IUserState>) => {
      store = testStore;
      store.setState(TEST_USER);
    }));

    it('should retrieve a current user from the Store', () => {
      userService.getCurrentUser()
        .subscribe(
          (res: IUserState) => {
            expect(res.id).toBe(TEST_USER_ID, 'An id of the retrieved user is not correct');
          }
        );
    });

  });

  describe('setCurrentUser()', () => {

    let dispatchSpy;

    beforeEach(inject([Store], (testStore: TestStore<IUserState>) => {
      store = testStore;
    }));

    it('should dispatch a SetUser action for once', () => {
      dispatchSpy = spyOn(store, 'dispatch');
      userService.setCurrentUser(TEST_USER);
      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(new SetUser(TEST_USER));
    });

  });

  afterEach(() => {
    httpTestingController.verify();
  });

});
