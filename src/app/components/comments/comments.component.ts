import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CommentsRoundActions } from '../../store/comments/comments.actions';
import { INITIAL_DEFAULT_COMMENTS_STATE } from '../../constants/comments-store.constant';
import { GlobalState } from '../../store/global/global.state';
import { CommentsState } from '../../store/comments/comments.state';
import { Team } from '../../enums/global-state.enum';
import { ICommentOption } from '../../interfaces/comments-store.intarface';
import { GlobalActions } from '../../store/global/global.actions';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: [ './comments.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsComponent implements OnInit {
  store = inject(Store);

  team = Team;
  teamsQuestions = {
    [Team.Team1]: this.store.selectSignal(CommentsState.getTeam1Question),
    [Team.Team2]: this.store.selectSignal(CommentsState.getTeam2Question)
  };

  indexTeamInAction = this.store.selectSignal(GlobalState.getIndexTeamInAction);

  ngOnInit(): void {
    this.store.dispatch(new CommentsRoundActions.SetInitialState(INITIAL_DEFAULT_COMMENTS_STATE));
  }

  checkAnswer(team: Team, option: ICommentOption): void {
    if (option.isCorrect) {
      this.store.dispatch(new GlobalActions.SetTeamScore(team, this.teamsQuestions[team]().score));
    } else {
      this.store.dispatch(new CommentsRoundActions.RemoveCommentOptionAndDecreaseScore(team, 'question1', option.videoName));
    }
  }
}
