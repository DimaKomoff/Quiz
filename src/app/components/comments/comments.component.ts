import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { COMMENTS_ROUND_STORE_CONSTANT } from '../../constants/comments-store.constant';
import { Question } from '../../enums/comments.enum';
import { RoundName, Team } from '../../enums/global-state.enum';
import { ICommentOption } from '../../interfaces/comments-store.intarface';
import { AudioService } from '../../services/audio.service';
import { LocalStorageService } from '../../services/local-storage.service';

import { CommentsRoundActions } from '../../store/comments/comments.actions';
import { CommentsState } from '../../store/comments/comments.state';
import { GlobalActions } from '../../store/global/global.actions';
import { GlobalState } from '../../store/global/global.state';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: [ './comments.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsComponent implements OnInit {
  private readonly _localStorage = inject(LocalStorageService);
  private readonly _store = inject(Store);
  private readonly _audioService = inject(AudioService);

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
  indexTeamInAction = this._store.selectSignal(GlobalState.getTeamInActionIndex);

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
      if (this.isRoundOver) {
        this.goToNextRound();

        return;
      }
      this._store.dispatch(new GlobalActions.ChangeTeamInAction());
      this._audioService.playCorrectBeatOff();
    } else {
      this._store.dispatch(new CommentsRoundActions.RemoveCommentOptionAndDecreaseScore(team, teamCurrentQuestion, option.videoName));

      if (this.teamsQuestions[this.indexTeamInAction()]().options.length === 1) {
        this._store.dispatch(new GlobalActions.UpdateCurrentTeamScore(1));
        this._store.dispatch(new CommentsRoundActions.ChangeTeamQuestion(team, teamCurrentQuestion));
        if (this.isRoundOver) {
          this.goToNextRound();

          return;
        }
        this._store.dispatch(new GlobalActions.ChangeTeamInAction());
      }

      this._audioService.playIncorrectBeatOff();
    }

    this.openSnackBar(option.isCorrect ? 'Вірно' : 'Невірно');
  }

  private get isRoundOver(): boolean {
    return Object.values(this.teamsCurrentQuestions).every((currentQuestion: Signal<Question>) => currentQuestion() === null);
  }

  private goToNextRound(): void {
    this._store.dispatch(new GlobalActions.SetRound(RoundName.FifthTenth));
    this._localStorage.removeItem(COMMENTS_ROUND_STORE_CONSTANT.localStorageKey)
  }

  private openSnackBar(message: string): void {
    this._snackBar.open(message, 'X', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
