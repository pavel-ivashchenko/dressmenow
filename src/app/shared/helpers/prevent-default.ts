
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { stopEvent } from './stop-event';

export const preventDefault$ = (source$: Observable<any[]>): Observable<string> => source$.pipe(
  map(([ value, event ]) => {
    event ? stopEvent(event) : null;
    return value;
  })
);
