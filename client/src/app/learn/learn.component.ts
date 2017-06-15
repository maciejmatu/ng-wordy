import { Component, OnInit, OnDestroy } from '@angular/core';
import { Word } from '../models/word';
import { NgRedux, select } from '@angular-redux/store';
import { LearnActions } from './learn.actions';
import { AppState } from '../store';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  @select('langToggled') langToggled$: Observable<boolean>;
  @select('wordList') wordList$: Observable<Word[]>;

  wordList: Word[];
  currentId = 0;
  langToggled: boolean;

  constructor(private ngRedux: NgRedux<AppState>,
              private learnActions: LearnActions) {
  }

  ngOnInit() {
    this.langToggled$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(toggled => this.langToggled = toggled);

    this.wordList$
      .takeUntil(this.ngUnsubscribe)
      .subscribe( wordList => this.wordList = wordList);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  toggleLanguage(): void {
    this.learnActions.toggleLang();
  }

  showWordToGuess() {
    return this.wordList[this.currentId] ? this.wordList[this.currentId][this.getLang(this.langToggled)] : '';
  }

  getLang(switched: boolean = false) {
    return (switched) ? 'nativeWord' : 'foreignWord';
  }

  changeWord(num = 1): void {
    const nextId = this.currentId + num;

    if (this.wordList[nextId]) this.currentId += num;
  }

  onSubmit(value): void {
    const currentWord = this.wordList[this.currentId][this.getLang(!this.langToggled)];

    if (value.toLocaleLowerCase() === currentWord.toLocaleLowerCase()) {
      console.log('correct');
    }
  }

}
