import { Component, inject } from '@angular/core';
import { AppService } from '../app-service';

@Component({
  selector: 'app-results-component',
  standalone: true,
  imports: [],
  templateUrl: './results-component.html',
  styleUrl: './results-component.scss',
})
export class ResultsComponent {
  //=========== INJECTING APP-SERVICE ===========//
  private appService = inject(AppService);

  questions = this.appService.getQuestions();
  userScore = this.appService.userScore;

  // restartQuiz method
  restartQuiz() {
    this.appService.resetQuiz();
  }
}
