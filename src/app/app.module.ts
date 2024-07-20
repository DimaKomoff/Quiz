import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { quizInitializer } from './initializers/quiz.initializer';
import { GlobalState } from './store/global/global.state';
import { EnterTeamNamesComponent } from './components/enter-team-names/enter-team-names.component';
import { TrickComponent } from './components/trick/trick.component';

@NgModule({
  declarations: [
    AppComponent,
    EnterTeamNamesComponent,
    TrickComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    NgxsModule.forRoot([
      GlobalState
    ], {developmentMode: true}),
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: quizInitializer,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
