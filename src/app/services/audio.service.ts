import { DOCUMENT } from '@angular/common';
import { inject, Injectable, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private readonly rendererFactory2 = inject(RendererFactory2);

  private readonly document = inject(DOCUMENT);

  private readonly renderer2 = this.rendererFactory2.createRenderer(null, null);

  private correctBatOff!: HTMLAudioElement;

  private incorrectBatOff!: HTMLAudioElement;

  private startAudioElement!: HTMLAudioElement;

  private endAudioElement!: HTMLAudioElement;

  constructor() {
    this.insertAudio();
  }

  playCorrectBeatOff() {
    this.correctBatOff.play();
  }

  playIncorrectBeatOff() {
    this.incorrectBatOff.play();
  }

  playStartTimer() {
    this.startAudioElement.play();
  }

  playEndTimer() {
    this.endAudioElement.play();
  }

  private insertAudio(): void {
    const [
      correctBeatOff,
      incorrectBeatOff,
      startAudio,
      endAudio
    ] = [
      'assets/audio/beat_off.mp3',
      'assets/audio/beat_off.mp3',
      'assets/audio/start.mp3',
      'assets/audio/finish.mp3'
    ].map((audioPath) => {
      const audioElement: HTMLAudioElement = this.renderer2.createElement('audio');
      audioElement.src = audioPath;
      this.renderer2.appendChild(this.document.body, audioElement);

      return audioElement;
    })

    this.correctBatOff = correctBeatOff;
    this.incorrectBatOff = incorrectBeatOff;
    this.startAudioElement = startAudio;
    this.endAudioElement = endAudio;
  }
}
