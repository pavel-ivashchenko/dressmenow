

import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize, tap } from 'rxjs/operators';

import { User } from '@app/shared/interfaces';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  private users = JSON.parse(localStorage.getItem('users')) || [];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return of(null)
      .pipe(
        mergeMap(this.handleRoute(req, next)),
        materialize(),
        delay(500),
        dematerialize(),
      );
  }

  private handleRoute(req, next: HttpHandler) { // TODO investigate error when type of req is set
    return () => {
      const { url, method, body, headers } = req;
      switch (true) {
        case url.endsWith('/users/createAccount') && method === 'POST':
          return this.register(body);
        case url.endsWith('/users/authenticate') && method === 'POST':
          return this.authenticate(body);
        case url.endsWith('/users/remindPassword') && method === 'POST':
          return this.remindPassword(body);
        case url.endsWith('/users/checkLogin') && method === 'POST':
          return this.checkLogin(body);
        case url.endsWith('/users') && method === 'GET':
          return this.getUsers(headers);
        case url.match(/\/users\/\d+$/) && method === 'GET':
          return this.getUserById(url, headers);
        case url.match(/\/users\/\d+$/) && method === 'DELETE':
          return this.deleteUser(url, headers);
        default:
          return next.handle(req);
      }
    };
  }

  private register(body: User):
    Observable<never> | Observable<HttpResponse<{ status: 200, body: User }>> {
      const user = body;
      user.id = this.users.length ? Math.max(...this.users.map(x => x.id)) + 1 : 1;
      this.users.push(user);
      localStorage.setItem('users', JSON.stringify(this.users));
      return true ?
        this.ok(user) : this.error('Будь ласка, спробуйте ще раз або перезавантажте сторінку і введіть дані повторно');
  }

  private authenticate(body: { login: string; password: string }):
    Observable<never> | Observable<HttpResponse<{ status: 200, body: User }>> {
      const { login, password } = body;
      const user = this.users.find(x => x.email === login && x.password === password);
      return !user ?
        this.error('Будь ласка, перевірте корректність email та пароля') :
        this.ok({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          token: 'fake-jwt-token'
        });
  }

  private checkLogin(body: { email: string }):
    Observable<HttpResponse<{ status: 200, body: any }>> {
      return this.ok(
        this.users.find(x => x.email === body.email)
      );
  }

  private getUsers(headers: HttpHeaders):
    Observable<never> | Observable<HttpResponse<{ status: 200, body: any }>> {
      return !this.isLoggedIn(headers) ?
        this.unauthorized() :
        this.ok(this.users);
  }

  private getUserById(headers: HttpHeaders, url: string):
    Observable<never> | Observable<HttpResponse<{ status: 200, body: any }>> {
      if (!this.isLoggedIn(headers)) {
        return this.unauthorized();
      } else {
        const user = this.users.find(x => x.id === this.idFromUrl(url));
        return this.ok(user);
      }
  }

  private deleteUser(url: string, headers: HttpHeaders):
    Observable<never> | Observable<HttpResponse<{ status: 200, body: any }>> {
      if (!this.isLoggedIn(headers)) {
        return this.unauthorized();
      } else {
        this.users = this.users.filter(x => x.id !== this.idFromUrl(url));
        localStorage.setItem('users', JSON.stringify(this.users));
        return this.ok();
      }
  }

  private ok(bodyParam?): Observable<HttpResponse<{ status: 200, body: any }>> {
    return of(new HttpResponse({ status: 200, body: bodyParam }));
  }

  private unauthorized(): Observable<never> {
    return throwError({ status: 401, error: { message: 'Unauthorised' } });
  }

  private error(message: string): Observable<never> {
    return throwError({ error: { message } });
  }

  private isLoggedIn(headers: HttpHeaders): boolean {
    return headers.get('Authorization') === 'Bearer fake-jwt-token';
  }

  private idFromUrl(url: string): number {
    const urlParts = url.split('/');
    return parseInt(urlParts[urlParts.length - 1], 10);
  }

  private remindPassword(email: string):
    Observable<HttpResponse<{ status: 200, body: any }>> {
      return this.ok(true);
  }

}
