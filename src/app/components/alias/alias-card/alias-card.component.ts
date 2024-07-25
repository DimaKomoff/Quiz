import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAliasWord } from '../../../interfaces/alias.interface';

@Component({
  selector: 'app-alias-card',
  templateUrl: './alias-card.component.html',
  styleUrls: ['./alias-card.component.scss']
})
export class AliasCardComponent {
  @Input() word!: IAliasWord;
  @Input() lapInAction!: boolean;

  @Output() readonly skipped = new EventEmitter<void>();
  @Output() readonly answered = new EventEmitter<void>();
}
