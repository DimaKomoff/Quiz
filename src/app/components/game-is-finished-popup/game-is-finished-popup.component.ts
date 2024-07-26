import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { Team } from '../../enums/global-state.enum';
import { IGlobalState } from '../../interfaces/global-store.interface';

@Component({
  selector: 'app-game-is-finished-popup',
  templateUrl: './game-is-finished-popup.component.html',
  styleUrls: ['./game-is-finished-popup.component.scss'],
  imports: [
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    NgIf
  ],
  standalone: true
})
export class GameIsFinishedPopupComponent {
  readonly dialogRef = inject(MatDialogRef<GameIsFinishedPopupComponent>);

  globalState = inject<IGlobalState>(MAT_DIALOG_DATA);

  team1 = this.globalState.teams[Team.Team1];

  team2 = this.globalState.teams[Team.Team2];
}
