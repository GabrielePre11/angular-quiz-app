import { Component, inject } from '@angular/core';
import { AppService } from '../app-service';

@Component({
  selector: 'app-question-component',
  standalone: true,
  imports: [],
  templateUrl: './question-component.html',
  styleUrl: './question-component.scss',
})
export class QuestionComponent {
  //=========== INJECTING APP-SERVICE ===========//
  private appService = inject(AppService);

  // Questions
  questions = this.appService.getQuestions();

  questionIndex = this.appService.questionIndex;
  selectedOption = this.appService.selectedOption;
  currQuestion = this.appService.currentQuestion;

  // handleOptionClick method
  handleOptionClick(option: string) {
    this.appService.handleOptionClick(option);
  }
}
