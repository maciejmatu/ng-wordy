import {Component, OnInit} from '@angular/core';
import {IWord} from './learn.interface';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit {
  wordList: IWord[] = [
    {
      'en': 'Dance',
      'pl': 'Tańczyć'
    },
    {
      'en': 'Talk',
      'pl': 'Mówić'
    },
    {
      'en': 'Walk',
      'pl': 'Chodzić'
    },
  ];
  currentId: number = 0;
  langToggled: boolean = false;
  nativeLang: string = 'en';
  secondLang: string = 'pl';

  constructor() { }

  ngOnInit() {
  }

  toggleLanguage(): void {
    let lang = this.nativeLang;

    this.langToggled = !this.langToggled;
    this.nativeLang = this.secondLang;
    this.secondLang = lang;
  }

  changeWord(num = 1): void {
    let nextId = this.currentId + num;

    if (this.wordList[nextId]) this.currentId += num;
  }

  onSubmit(value): void {
    let currentWord = this.wordList[this.currentId][this.secondLang];

    if (value.toLocaleLowerCase() === currentWord.toLocaleLowerCase()) {
      console.log('correct')
    }
  }

}
