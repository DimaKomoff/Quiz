import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { RoundName } from './enums/global-state.enum';
import { HeaderService } from './services/header.service';
import { GlobalState } from './store/global/global.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  private readonly store = inject(Store);
  private readonly headerService = inject(HeaderService);

  @ViewChild('header') headerElementRef!: ElementRef<Element>;

  roundName = RoundName;

  round = this.store.selectSignal(GlobalState.getRound);
  teamInAction = this.store.selectSignal(GlobalState.getTeamInAction);
  currentRoundName = this.store.selectSignal(GlobalState.getRoundName);
  teamsList = this.store.selectSignal(GlobalState.getTeamsList);

  ngAfterViewInit(): void {
    this.headerService.setHeaderHeight(this.headerElementRef.nativeElement.clientHeight)
  }
}
