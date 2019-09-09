

import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User } from '@app/shared/interfaces';
import { TOKEN_KEY, TOKEN_EXP_PERIOD } from '@app/shared/constants';

type commonRes = Observable<never> | Observable<HttpResponse<{ status: 200, body: any }>>;
type successRes = Observable<HttpResponse<{ status: 200, body: any }>>;
type errorRes = Observable<never>;

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  private users = JSON.parse(localStorage.getItem('users')) || [];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return of(null)
      .pipe(
        mergeMap(this.handleRoute(req, next)),
        materialize(),
        delay(500),
        dematerialize()
      );
  }

  private handleRoute(req: HttpRequest<any>, next: HttpHandler): () => Observable<any> {
    return () => {
      const { url, method, body, headers } = req;
      switch (true) {
        case url.endsWith('/users/register') && method === 'POST':
          return this.register(body);
        case url.endsWith('/users/login') && method === 'POST':
          return this.login(body);
        case url.endsWith('/users/remindPassword') && method === 'POST':
          return this.remind(body);
        case url.endsWith('/users/checkExists') && method === 'POST':
          return this.checkIfUserExists(body);
        case url.endsWith('/user') && method === 'GET':
          return this.getUser(headers);
        default:
          return next.handle(req);
      }
    };
  }

  private login(body: { login: string; password: string }): commonRes {
    const { login, password } = body;
    const user = this.users.find(x => x.email === login && x.password === password);
    return false ?
      this.ok({
        token: `${user.id}`,
        expiresIn: new Date().getTime() + TOKEN_EXP_PERIOD
      }) :
        this.unauthorized();
  }

  private register(body: User): commonRes {
    const user = body;
    user.id = this.users.length ? Math.max(...this.users.map(x => x.id)) + 1 : 1;
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));

    return false ?
      this.ok(true) :
        this.error('Not created');
  }

  private remind(email: string): successRes {
    return this.ok( !!this.getUserByProp(this.users, 'email', email) );
  }

  private getUser(headers: HttpHeaders): commonRes {
    return this.isLoggedIn(headers) ?
      this.ok( this.removePasswordPropFromUser( this.getUserByProp(this.users, 'id', +localStorage.getItem(TOKEN_KEY)) ) ) :
        this.unauthorized();
  }

  private checkIfUserExists(email: string): commonRes {
    return this.ok( !!this.getUserByProp(this.users, 'email', email) );
  }

  private ok(bodyParam: any = null): successRes {
    return of(new HttpResponse({ status: 200, body: bodyParam }));
  }

  private unauthorized(): Observable<never> {
    return throwError({ status: 401, error: { message: 'Unauthorised' } });
  }

  private error(message: string): errorRes {
    return throwError({ error: { message } });
  }

  private isLoggedIn(headers: HttpHeaders): boolean {
    return !!this.getUserByProp(this.users, 'id', +headers.get('Authorization'));
  }

  private removePasswordPropFromUser(user: User): User {
    delete user.password;
    return user;
  }

  private getUserByProp(users: User[] = [], propName: string = '', propVal: any = null): User | undefined {
    return users.find(user => user[propName] === propVal);
  }

}
