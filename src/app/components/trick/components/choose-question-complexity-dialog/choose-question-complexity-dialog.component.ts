import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { QuestionComplexity } from '../../../../enums/trick-state.enum';
import { ITrickCategory } from '../../../../interfaces/trick.interface';

@Component({
  selector: 'app-choose-question-complexity-dialog',
  templateUrl: './choose-question-complexity-dialog.component.html',
  styleUrls: ['./choose-question-complexity-dialog.component.scss'],
  imports: [
    MatCardModule,
    MatDialogModule
  ],
  standalone: true
})
export class ChooseQuestionComplexityDialogComponent {
  private dialogRef = inject(MatDialogRef<ChooseQuestionComplexityDialogComponent>);

  category = inject<ITrickCategory>(MAT_DIALOG_DATA);

  questionComplexity = QuestionComplexity;

  chooseQuestionComplexity(complexity: QuestionComplexity) {
    this.dialogRef.close(complexity);
  }
}
