import { Store } from '@ngxs/store';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';

import { CommentsRoundActions } from '../../store/comments/comments.actions';
import { GlobalState } from '../../store/global/global.state';
import { CommentsState } from '../../store/comments/comments.state';
import { RoundName, Team } from '../../enums/global-state.enum';
import { ICommentOption } from '../../interfaces/comments-store.intarface';
import { GlobalActions } from '../../store/global/global.actions';
import { Question } from '../../enums/comments.enum';
import { LocalStorageService } from '../../services/local-storage.service';
import { COMMENTS_ROUND_STORE_CONSTANT } from '../../constants/comments-store.constant';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: [ './comments.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsComponent implements OnInit {
  private readonly _localStorage = inject(LocalStorageService);
  private readonly _store = inject(Store);

  team = Team;
  teamsQuestions = {
    [Team.Team1]: this._store.selectSignal(CommentsState.getTeam1Question),
    [Team.Team2]: this._store.selectSignal(CommentsState.getTeam2Question)
  };
  teamsCurrentQuestions = {
    [Team.Team1]: this._store.selectSignal(CommentsState.getTeam1CurrentQuestion),
    [Team.Team2]: this._store.selectSignal(CommentsState.getTeam2CurrentQuestion)
  };

  round = this._store.selectSignal(GlobalState.getRound);
  indexTeamInAction = this._store.selectSignal(GlobalState.getIndexTeamInAction);

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const localStorageState = this._localStorage.getItem(COMMENTS_ROUND_STORE_CONSTANT.localStorageKey);
    if (localStorageState) {
      this._store.dispatch(new CommentsRoundActions.SetInitialState(JSON.parse(localStorageState)));
    }
  }

  checkAnswer(team: Team, option: ICommentOption): void {
    const teamCurrentQuestion: Question = this.teamsCurrentQuestions[team]();

    if (option.isCorrect) {
      this._store.dispatch(new GlobalActions.UpdateCurrentTeamScore(this.teamsQuestions[team]().score));
      this._store.dispatch(new CommentsRoundActions.ChangeTeamQuestion(team, teamCurrentQuestion));
      this.isRoundOver() && this.goToNextRound();
      this._store.dispatch(new GlobalActions.ChangeTeamInAction());
    } else {
      this._store.dispatch(new CommentsRoundActions.RemoveCommentOptionAndDecreaseScore(team, teamCurrentQuestion, option.videoName));

      if (this.teamsQuestions[this.indexTeamInAction()]().options.length === 1) {
        this._store.dispatch(new GlobalActions.UpdateCurrentTeamScore(1));
        this._store.dispatch(new CommentsRoundActions.ChangeTeamQuestion(team, teamCurrentQuestion));
        this.isRoundOver() && this.goToNextRound();
        this._store.dispatch(new GlobalActions.ChangeTeamInAction());
      }
    }

    this.openSnackBar(option.isCorrect ? 'Вірно' : 'Невірно');
  }

  private isRoundOver(): boolean {
    return Object.values(this.teamsCurrentQuestions).every((currentQuestion: Signal<Question>) => currentQuestion() === null);
  }

  private goToNextRound(): void {
    const nextRound = Object.values(RoundName).find(r => r === this.round() as RoundName + 1);

    if (nextRound !== undefined) {
      this._store.dispatch(new GlobalActions.SetRound(nextRound as RoundName));
    }
  }

  private openSnackBar(message: string): void {
    this._snackBar.open(message, 'X', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
