import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { ITrickCategory } from '../../../../interfaces/trick.interface';
import { TrickState } from '../../../../store/trick/trick.state';
import {
  ChooseQuestionComplexityDialogComponent
} from '../choose-question-complexity-dialog/choose-question-complexity-dialog.component';

@Component({
  selector: 'app-choose-question',
  templateUrl: './choose-question.component.html',
  styleUrls: ['./choose-question.component.scss']
})
export class ChooseQuestionComponent {
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog)

  roundTask = this.store.selectSignal(TrickState.getRoundTask);

  chooseQuestionComplexity(category: ITrickCategory) {
    this.dialog.open(ChooseQuestionComplexityDialogComponent, {
      data: category
    }).afterClosed().subscribe(console.log)
  }

}
