
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { stopEvent } from './stop-event';

export const preventDefault$ = (source$: Observable<any[]>): Observable<string> => source$.pipe(
  map(([ value, event ]) => {
    if (event) { stopEvent(event); }
    return value;
  })
);
