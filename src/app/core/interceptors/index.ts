
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ErrorInterceptor } from './error.interceptor';

export const APP_INTERCEPTORS = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
]
