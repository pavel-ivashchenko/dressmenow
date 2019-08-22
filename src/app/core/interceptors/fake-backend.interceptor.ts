

import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize, tap } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  private users = JSON.parse(localStorage.getItem('users')) || [];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    debugger;

    const { url, method, headers, body } = request;

    return of(null)
      .pipe(
        tap(res => { debugger }),
        mergeMap(handleRoute),
        materialize(),
        delay(500),
        dematerialize()
      );

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/register') && method === 'POST':
          return register();
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.match(/\/users\/\d+$/) && method === 'GET':
          return getUserById();
        case url.match(/\/users\/\d+$/) && method === 'DELETE':
          return deleteUser();
        default:
          return next.handle(request);
      }
    }

    function register() {

      const user = body;

      if (this.users.find(x => x.username === user.username)) {
        return error('Username "' + user.username + '" is already taken');
      }

      user.id = this.users.length ? Math.max(...this.users.map(x => x.id)) + 1 : 1;
      this.users.push(user);
      localStorage.setItem('users', JSON.stringify(this.users));

      return ok();

    }

    function authenticate() {
      const { username, password } = body;
      const user = this.users.find(x => x.username === username && x.password === password);
      return !user ?
        error('Username or password is incorrect') :
        ok({
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          token: 'fake-jwt-token'
        });
    }

    function getUsers() {
      return !isLoggedIn() ?
        unauthorized() :
        ok(this.users);
    }

    function getUserById() {
      if (!isLoggedIn()) {
        return unauthorized();
      } else {
        const user = this.users.find(x => x.id === idFromUrl());
        return ok(user);
      }
    }

    function deleteUser() {
      if (!isLoggedIn()) {
        return unauthorized();
      } else {
        this.users = this.users.filter(x => x.id !== idFromUrl());
        localStorage.setItem('users', JSON.stringify(this.users));
        return ok();
      }
    }

    function ok(bodyParam?) {
      return of(new HttpResponse({ status: 200, body: bodyParam }));
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1], 10);
    }

    //https://jasonwatmore.com/post/2018/10/29/angular-7-user-registration-and-login-example-tutorial

  }
}
