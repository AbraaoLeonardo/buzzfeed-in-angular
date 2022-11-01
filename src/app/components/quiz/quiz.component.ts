import { Component, OnInit } from '@angular/core';
import quizz from '../../../assets/data/quizz.json'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.sass']
})
export class QuizComponent implements OnInit {
  title:string = 'Esse e o meu titulo';
  questions:any = 'Essa é a minha pergunta'
  questionSelected:any = ''

  answers:string[] = [];
  answerSelected:string = '';

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false;

  constructor() { }

  ngOnInit(): void {
    if(quizz){
      this.finished = false;
      this.title = quizz.title

      this.questions = quizz.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }
  }

  playerChoise(value:string){
    this.answers.push(value);
    this.nextSetp()
  }

  async nextSetp(){
    this.questionIndex+=1;
    if(this.questionMaxIndex > this.questionIndex)
      this.questionSelected = this.questions[this.questionIndex]
    else{
      const finalAnswer:string = await this.checkResult(this.answers);
      this.finished = true
      this.answerSelected = quizz.results[finalAnswer as keyof typeof quizz.results]
    }
  }

  async checkResult(answers:string[]){
    const result = answers.reduce((previous,current,i,arr)=>{
      if(
        arr.filter(item => item === previous).length>
        arr.filter(item => item === current).length
      )
        return previous;
      
      else 
        return current;
    })
    return result;
  }
}
