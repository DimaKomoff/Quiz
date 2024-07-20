import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { RoundName } from './enums/global-state.enum';
import { GlobalActions } from './store/global/global.actions';
import { GlobalState } from './store/global/global.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store);
  title = 'quiz';

  ngOnInit(): void {
    this.store.select(GlobalState.getRound).subscribe(console.log)

    this.store.dispatch(new GlobalActions.SetRound(RoundName.Comments))
  }
}
