import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { filter, take } from 'rxjs';
import { QuestionComplexity } from '../../../../enums/trick-state.enum';
import { ITrickCategory } from '../../../../interfaces/trick.interface';
import { TrickActions } from '../../../../store/trick/trick.actions';
import { TrickState } from '../../../../store/trick/trick.state';
import {
  ChooseQuestionComplexityDialogComponent
} from '../choose-question-complexity-dialog/choose-question-complexity-dialog.component';

@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.component.html',
  styleUrls: ['./choose-category.component.scss']
})
export class ChooseCategoryComponent {
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);

  categories = this.store.selectSignal(TrickState.getRoundCategories);

  chooseQuestionComplexity(category: ITrickCategory) {
    this.dialog.open(ChooseQuestionComplexityDialogComponent, {
      data: category
    }).afterClosed().pipe(
        take(1),
        filter(res => res !== undefined)
    ).subscribe((questionComplexity: QuestionComplexity) => {
      this.store.dispatch(new TrickActions.SelectQuestion(category, questionComplexity));
    })
  }

}
