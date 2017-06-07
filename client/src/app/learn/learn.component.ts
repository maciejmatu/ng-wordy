import { Component, OnInit, OnDestroy } from '@angular/core';
import { Word } from '../models/word';
import { WordListService } from "../services/wordList.service";
import { NgRedux } from '@angular-redux/store';
import { LearnActions } from './learn.actions';
import { AppState } from '../store';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit, OnDestroy {
  subscription;
  wordList: Word[];
  currentId: number = 0;
  langToggled: boolean;

  constructor(private wordListService: WordListService,
    private ngRedux: NgRedux<AppState>,
    private actions: LearnActions) {

    this.subscription = this.ngRedux.select<boolean>('langToggled')
      .subscribe(toggled => this.langToggled = toggled);

    this.wordListService.wordList$.subscribe( results =>{
      this.wordList = results;
    });

  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleLanguage(): void {
    this.ngRedux.dispatch(this.actions.toggleLang());
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
