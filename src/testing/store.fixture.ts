
import { BehaviorSubject, Observable } from 'rxjs';

export class TestStore<T> {

  public state: BehaviorSubject<T> = new BehaviorSubject(undefined);

  public setState(data: T): void {
    this.state.next(data);
  }

  public select(selector?: any): Observable<T> {
    return this.state.asObservable();
  }

  public dispatch(action: any): void { }

}
