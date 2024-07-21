import { Store } from '@ngxs/store';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CommentsRoundActions } from '../../store/comments/comments.actions';
import { GlobalState } from '../../store/global/global.state';
import { CommentsState } from '../../store/comments/comments.state';
import { Team } from '../../enums/global-state.enum';
import { ICommentOption } from '../../interfaces/comments-store.intarface';
import { GlobalActions } from '../../store/global/global.actions';
import { Question } from '../../enums/comments.enum';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: [ './comments.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsComponent {
  store = inject(Store);

  team = Team;
  teamsQuestions = {
    [Team.Team1]: this.store.selectSignal(CommentsState.getTeam1Question),
    [Team.Team2]: this.store.selectSignal(CommentsState.getTeam2Question)
  };
  teamsCurrentQuestions = {
    [Team.Team1]: this.store.selectSignal(CommentsState.getTeam1CurrentQuestion),
    [Team.Team2]: this.store.selectSignal(CommentsState.getTeam2CurrentQuestion)
  };

  indexTeamInAction = this.store.selectSignal(GlobalState.getIndexTeamInAction);

  checkAnswer(team: Team, option: ICommentOption): void {
    const teamCurrentQuestion: Question = this.teamsCurrentQuestions[team]();

    if (option.isCorrect) {
      this.store.dispatch(new GlobalActions.UpdateTeamScore(team, this.teamsQuestions[team]().score));
      this.store.dispatch(new CommentsRoundActions.ChangeTeamQuestion(team, teamCurrentQuestion));
      this.store.dispatch(new GlobalActions.ChangeTeamInAction);
    } else {
      this.store.dispatch(new CommentsRoundActions.RemoveCommentOptionAndDecreaseScore(team, teamCurrentQuestion, option.videoName));
    }
  }
}
