import {Component, OnInit} from '@angular/core';
import {Word} from './word';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit {
  wordList: Word[] = [
    {
      'foreignWord': 'Dance',
      'nativeWord': 'Tańczyć'
    },
    {
      'foreignWord': 'Talk',
      'nativeWord': 'Mówić'
    },
    {
      'foreignWord': 'Walk',
      'nativeWord': 'Chodzić'
    },
  ];
  currentId: number = 0;
  langToggled: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleLanguage(): void {
    this.langToggled = !this.langToggled;
  }

  changeWord(num = 1): void {
    let nextId = this.currentId + num;

    if (this.wordList[nextId]) this.currentId += num;
  }

  onSubmit(value): void {
    let currentWord = this.wordList[this.currentId][(!this.langToggled ? 'foreignWord' : 'nativeWord')]

    if (value.toLocaleLowerCase() === currentWord.toLocaleLowerCase()) {
      console.log('correct')
    }
  }

}
