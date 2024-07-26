import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private readonly _headerHeight$ = new BehaviorSubject<number>(0);

  readonly headerHeight$ = this._headerHeight$.asObservable();


  setHeaderHeight(headerHeight: number) {
    this._headerHeight$.next(headerHeight);
  }
}
