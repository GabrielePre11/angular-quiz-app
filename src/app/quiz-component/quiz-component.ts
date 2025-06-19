import { Component, inject } from '@angular/core';
import { AppService } from '../app-service';
import { QuestionComponent } from '../question-component/question-component';

@Component({
  selector: 'app-quiz-component',
  standalone: true,
  imports: [QuestionComponent],
  templateUrl: './quiz-component.html',
  styleUrl: './quiz-component.scss',
})
export class QuizComponent {
  //=========== INJECTING APP-SERVICE ===========//
  private appService = inject(AppService);

  // Questions
  questions = this.appService.getQuestions();

  questionIndex = this.appService.questionIndex;
  score = this.appService.userScore;
  selectedOption = this.appService.selectedOption;
  currQuestion = this.appService.currentQuestion;

  // AppService Methods
  prevQuest() {
    this.appService.goToPrevQuestion();
  }
  nextQuest() {
    this.appService.goToNextQuestion();
  }
}
