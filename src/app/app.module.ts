import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLineModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnterTeamNamesComponent } from './components/enter-team-names/enter-team-names.component';
import { ChooseCategoryComponent } from './components/trick/components/choose-question/choose-category.component';
import { QuestionComponent } from './components/trick/components/question/question.component';
import { TrickComponent } from './components/trick/trick.component';
import { quizInitializer } from './initializers/quiz.initializer';
import { GlobalState } from './store/global/global.state';
import { TrickState } from './store/trick/trick.state';

@NgModule({
  declarations: [
    AppComponent,
    EnterTeamNamesComponent,
    TrickComponent,
    ChooseCategoryComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    NgxsModule.forRoot([
      GlobalState,
      TrickState
    ], {developmentMode: true}),
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDialogModule,
    MatToolbarModule,
    MatLineModule
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
