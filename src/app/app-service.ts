import { computed, Injectable, signal } from '@angular/core';
import { Question } from './model/question.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  // Questions Array
  private Questions: Question[] = [
    {
      id: 1,
      question: "Qual è il capitale d'Italia?",
      options: ['Milano', 'Roma', 'Napoli', 'Torino'],
      answer: 'Roma',
    },
    {
      id: 2,
      question: "Chi ha scritto 'La Divina Commedia'?",
      options: ['Petrarca', 'Dante Alighieri', 'Boccaccio', 'Manzoni'],
      answer: 'Dante Alighieri',
    },
    {
      id: 3,
      question: 'Quanto fa 7 x 8?',
      options: ['56', '48', '64', '58'],
      answer: '56',
    },
    {
      id: 4,
      question: 'Quale linguaggio viene usato con Angular?',
      options: ['Java', 'TypeScript', 'Python', 'PHP'],
      answer: 'TypeScript',
    },
    {
      id: 5,
      question: 'In che anno è stato pubblicato Angular 2?',
      options: ['2014', '2016', '2017', '2019'],
      answer: '2016',
    },
    {
      id: 6,
      question: 'Quale direttiva si usa in Angular per iterare su una lista?',
      options: ['*ngIf', '*ngFor', '*ngModel', '*ngSwitch'],
      answer: '*ngFor',
    },
    {
      id: 7,
      question: 'In React, quale metodo si usa per iterare su una lista?',
      options: ['forEach', 'map', 'reduce', 'loop'],
      answer: 'map',
    },
    {
      id: 8,
      question: 'Come si gestisce lo stato in React?',
      options: ['useEffect', 'useReducer', 'useState', 'setState'],
      answer: 'useState',
    },
    {
      id: 9,
      question: 'Qual è l’equivalente di ngOnInit in React?',
      options: ['componentDidMount', 'useEffect', 'useLayoutEffect', 'onInit'],
      answer: 'useEffect',
    },
    {
      id: 10,
      question: 'Come si lega un evento click in Angular?',
      options: ['onClick={...}', '(click)="..."', '@Click', '[on-click]="..."'],
      answer: '(click)="..."',
    },
  ];

  // questionIndex handles the state of the index, when it changes, the question changes as well.
  questionIndex = signal<number>(0);

  // userScore sets the score of the user, initially set to 0.
  userScore = signal<number>(0);

  // The selectedOption can be either a string or null, initially it's set to null, because the user hasn't chose an answer/option.
  selectedOption = signal<string | null>(null);

  // The current question updates the question when the questionIndex changes.
  currentQuestion = computed(() => this.Questions[this.questionIndex()]);

  // hasFinished let Angular understand when the user has arrived to the last question and is ready to finish the quiz, hence it can display the Result Component.
  hasFinished = signal<boolean>(false);

  /*
  userAnswers tracks all the user answers, and to do that we create a Record where the key is the question ID and the value is the selected option.
  */
  userAnswers = signal<Record<number, string>>({});

  getQuestions() {
    // Returns the full array of questions, useful if other components need access to them.
    return this.Questions;
  }

  goToPrevQuestion() {
    /*
    - Moves forward to the next question if there are more questions available.
    - If the user is at the last question, it sets hasFinished to true so Angular can show the Result Component.
    */
    if (this.questionIndex() === 0) return;
    this.questionIndex.update((prev) => prev - 1);
  }

  goToNextQuestion() {
    if (this.questionIndex() < this.Questions.length - 1) {
      this.questionIndex.update((prev) => prev + 1);
    } else {
      this.hasFinished.set(true);
    }
  }

  handleOptionClick(option: string) {
    /*
    - handleOptionClick stores the user's choice in the userAnswers record.

    - If it's the first time the user answers this question, it checks if the answer is correct and updates the score.
    
    - If the user changes the answer:
      - If the previous one was correct and the new one is wrong, the score decreases.
      - If the previous one was wrong and the new one is correct, the score increases.
    */
    const questionId = this.currentQuestion().id;
    const previousAnswer = this.userAnswers()[questionId];
    const correctAnswer = this.currentQuestion().answer;

    this.selectedOption.set(option);

    if (!previousAnswer) {
      this.userAnswers.update((answer) => ({
        ...answer,
        [questionId]: option,
      }));

      if (option === correctAnswer) {
        this.userScore.set(this.userScore() + 1);
      }
    } else if (previousAnswer !== option) {
      this.userAnswers.update((answer) => ({
        ...answer,
        [questionId]: option,
      }));

      if (previousAnswer === correctAnswer && option !== correctAnswer) {
        this.userScore.set(this.userScore() - 1);
      } else if (previousAnswer !== correctAnswer && option === correctAnswer) {
        this.userScore.set(this.userScore() + 1);
      }
    }
  }

  resetQuiz() {
    /*
    - resetQuiz resets the entire quiz state:
      - Goes back to the first question.
      - Resets the user's score to 0.
      - Clears the selected option.
      - Sets hasFinished to false so the quiz can start again.
      - Clears all previously stored user answers.
    */
    this.questionIndex.set(0);
    this.userScore.set(0);
    this.selectedOption.set(null);
    this.hasFinished.set(false);
    this.userAnswers.set({});
  }
}
