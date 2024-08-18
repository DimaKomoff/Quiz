import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, finalize, map, Observable, of, switchMap, takeWhile, timer } from 'rxjs';
import { AudioService } from './audio.service';

interface ICountdown {
  countdown$: Observable<number>;

  triggerFn(status?: boolean): void;
}

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  private readonly audioService = inject(AudioService);

  getCountdown(seconds: number, finalizeCallback: () => void): ICountdown {
    const triggerTimer$ = new BehaviorSubject<boolean>(false);

    return {
      countdown$: triggerTimer$.pipe(
        switchMap(triggered => {
          if (triggered) {
            this.audioService.playStartTimer();

            return timer(0, 1000).pipe(
              map(n => seconds - n),
              takeWhile(n => n >= 0),
              finalize(() => {
                finalizeCallback();
                this.audioService.playEndTimer();
              })
            )
          }

          return of(seconds);
        }),
      ),
      triggerFn(status: boolean = true) {
        triggerTimer$.next(status);
      }
    }
  }
}
