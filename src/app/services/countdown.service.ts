import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap, takeWhile, timer } from 'rxjs';

interface ICountdown {
  countdown$: Observable<number>;
  triggerFn(): void;
}

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  getCountdown(seconds: number): ICountdown {
    const triggerTimer$ = new BehaviorSubject<boolean>(false);

    return {
      countdown$: triggerTimer$.pipe(
        switchMap(triggered => {
          return triggered ? timer(0, 1000) : of(0);
        }),
        map(n => seconds - n),
        takeWhile(n => n >= 0)
      ),
      triggerFn() {
        triggerTimer$.next(true);
      }
    }
  }
}
