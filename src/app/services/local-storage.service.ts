import { inject, Injectable } from '@angular/core';
import { WINDOW } from '../tokens/window.token';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly window = inject(WINDOW);

  setItem(key: string, value: string): void {
    this.window.localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return this.window.localStorage.getItem(key);
  }

  removeItem(key: string): void {
    this.window.localStorage.removeItem(key);
  }

  clear(): void {
    this.window.localStorage.clear();
  }
}
