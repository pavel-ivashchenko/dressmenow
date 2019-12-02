
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class TestStore<T> {
  public state: BehaviorSubject<T> = new BehaviorSubject(undefined);

  public setState(data: T) {
    this.state.next(data);
  }

  public select(selector: any = () => {}): Observable<T> {
    return this.state.pipe( map(selector) );
  }

  public pipe(selector: any = () => {}): Observable<T> {
    return this.select(selector);
  }

  public dispatch(action: any) { }
}
