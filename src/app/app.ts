import { Component, inject } from '@angular/core';
import { QuizComponent } from './quiz-component/quiz-component';
import { AppService } from './app-service';
import { ResultsComponent } from './results-component/results-component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [QuizComponent, ResultsComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'angular-quiz-app';

  //=========== INJECTING APP-SERVICE ===========//
  private appService = inject(AppService);

  // Questions
  questions = this.appService.getQuestions();

  // hasFinished
  hasFinished = this.appService.hasFinished;

  // questionIndex
  questionIndex = this.appService.questionIndex;
}
