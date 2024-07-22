import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { filter, take } from 'rxjs';
import { FIFTH_TENTH_STORE_CONSTANT } from '../../constants/fifth-tenth.constant';
import { IFifthTenthRoundQuestion } from '../../interfaces/fifth-tenth.interface';
import { LocalStorageService } from '../../services/local-storage.service';
import { FifthTenthActions } from '../../store/fifth-tenth/fifth-tenth.actions';
import { FifthTenthState } from '../../store/fifth-tenth/fifth-tenth.state';
import { PlayQuestionDialogComponent } from './components/play-question-dialog/play-question-dialog.component';

@Component({
  selector: 'app-fifth-tenth',
  templateUrl: './fifth-tenth.component.html',
  styleUrls: ['./fifth-tenth.component.scss']
})
export class FifthTenthComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);
  private readonly localStorage = inject(LocalStorageService);

  questions = this.store.selectSignal(FifthTenthState.questions);

  ngOnInit() {
    const localStorageState = this.localStorage.getItem(FIFTH_TENTH_STORE_CONSTANT.localStorageKey);
    if (localStorageState) {
      this.store.dispatch(new FifthTenthActions.SetInitialState(JSON.parse(localStorageState)));
    }
  }

  onQuestionPlay(index: number, question: IFifthTenthRoundQuestion): void {
    this.dialog.open(PlayQuestionDialogComponent, {
      data: question,
    }).afterClosed().pipe(
      take(1),
      filter(r => r !== undefined)
    ).subscribe(isCorrectAnswer => {
      this.store.dispatch(new FifthTenthActions.QuestionPlayed(index, isCorrectAnswer));
    })
  }
}
