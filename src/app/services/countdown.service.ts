import { DOCUMENT } from '@angular/common';
import { inject, Injectable, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, finalize, map, Observable, of, switchMap, takeWhile, timer } from 'rxjs';

interface ICountdown {
  countdown$: Observable<number>;

  triggerFn(status?: boolean): void;
}

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  private readonly rendererFactory2 = inject(RendererFactory2);

  private readonly document = inject(DOCUMENT);

  private readonly renderer2 = this.rendererFactory2.createRenderer(null, null);

  private startAudioElement!: HTMLAudioElement;

  private endAudioElement!: HTMLAudioElement;

  constructor() {
    this.insertAudio();
  }

  getCountdown(seconds: number, finalizeCallback: () => void): ICountdown {
    const triggerTimer$ = new BehaviorSubject<boolean>(false);

    return {
      countdown$: triggerTimer$.pipe(
        switchMap(triggered => {
          if (triggered) {
            this.startAudioElement.play();

            return timer(0, 1000).pipe(
              map(n => seconds - n),
              takeWhile(n => n >= 0),
              finalize(() => {
                finalizeCallback();
                this.endAudioElement.play()
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

  insertAudio(): void {
    const startAudio: HTMLAudioElement = this.renderer2.createElement('audio');
    startAudio.src = 'assets/audio/start.mp3';

    const endAudio: HTMLAudioElement = this.renderer2.createElement('audio');
    endAudio.src = 'assets/audio/finish.mp3';

    this.startAudioElement = startAudio;
    this.endAudioElement = endAudio;

    this.renderer2.appendChild(this.document.body, startAudio);
    this.renderer2.appendChild(this.document.body, endAudio);
  }
}
