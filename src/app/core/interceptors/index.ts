
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtInterceptor } from './jwt.interceptor';
import { FakeBackendInterceptor } from './fake-backend.interceptor';
import { ErrorInterceptor } from './error.interceptor';

export const APP_INTERCEPTORS = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];
