import {Component, OnInit} from '@angular/core';
import {Word} from '../models/word';
import {WordListService} from "../services/wordList.service";

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit {
  wordList: Word[];
  currentId: number = 0;
  langToggled: boolean = false;

  constructor(private wordListService: WordListService) {
    this.wordListService.wordList$.subscribe( results =>{
      this.wordList = results;
    });
  }

  ngOnInit() {}

  toggleLanguage(): void {
    this.langToggled = !this.langToggled;
  }

  showWordToGuess(){
    return this.wordList[this.currentId] ? this.wordList[this.currentId][this.getLang(this.langToggled)] : ""
  }

  getLang(switched: boolean = false) {
    return (switched) ? 'nativeWord' : 'foreignWord';
  }

  changeWord(num = 1): void {
    let nextId = this.currentId + num;

    if (this.wordList[nextId]) this.currentId += num;
  }

  onSubmit(value): void {
    let currentWord = this.wordList[this.currentId][this.getLang(!this.langToggled)];

    if (value.toLocaleLowerCase() === currentWord.toLocaleLowerCase()) {
      console.log('correct')
    }
  }

}
