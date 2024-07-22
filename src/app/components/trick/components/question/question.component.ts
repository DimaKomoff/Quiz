import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { AnswerStatus } from '../../../../enums/global-state.enum';
import { TrickActions } from '../../../../store/trick/trick.actions';
import { TrickState } from '../../../../store/trick/trick.state';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  private readonly store = inject(Store);

  question = this.store.selectSignal(TrickState.getQuestionInAction);

  markCorrect() {
    this.store.dispatch(new TrickActions.AnswerQuestion(AnswerStatus.Correct));
  }

  markIncorrect() {
    this.store.dispatch(new TrickActions.AnswerQuestion(AnswerStatus.Incorrect));
  }
}
