import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { IFifthTenthRoundQuestion } from '../../../../interfaces/fifth-tenth.interface';
import { CountdownService } from '../../../../services/countdown.service';

@Component({
  selector: 'app-play-question-dialog',
  templateUrl: './play-question-dialog.component.html',
  styleUrls: ['./play-question-dialog.component.scss'],
  imports: [
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    NgIf,
    AsyncPipe
  ],
  standalone: true
})
export class PlayQuestionDialogComponent {
  private readonly countdownService = inject(CountdownService);

  private readonly dialogRef = inject(MatDialogRef<PlayQuestionDialogComponent>)

  question = inject<IFifthTenthRoundQuestion>(MAT_DIALOG_DATA);

  isStarted = false;

  isFinished = false;

  countdown = this.countdownService.getCountdown(10);

  secondsRemaining$ = this.countdown.countdown$.pipe(
    finalize(() => {
      this.isFinished = true;
    })
  );

  start(): void {
    this.countdown.triggerFn();
    this.isStarted = true;
  }

  incorrect() {
    this.dialogRef.close(false);
  }

  correct() {
    this.dialogRef.close(true);
  }
}
