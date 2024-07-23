import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFifthTenthRoundQuestion } from '../../../../interfaces/fifth-tenth.interface';

@Component({
  selector: 'app-fifth-tenth-task-item',
  templateUrl: './fifth-tenth-task-item.component.html',
  styleUrls: ['./fifth-tenth-task-item.component.scss']
})
export class FifthTenthTaskItemComponent {
  @Input() question!: IFifthTenthRoundQuestion;

  @Output() readonly playQuestion = new EventEmitter<void>();
}
