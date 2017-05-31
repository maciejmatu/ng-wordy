import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit {
  wordList: any[] = [
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
  lang: string = 'en';
  secondLang: string = 'pl';

  constructor() { }

  ngOnInit() {
  }

  toggleLanguage(): void {
    let lang = this.lang;
    this.lang = this.secondLang;
    this.secondLang = lang;
  }

  changeWord(num = 1): void {
    let nextId = this.currentId + num;

    if (this.wordList[nextId]) this.currentId += num;
  }

  onSubmit(value): void {
    let currentWord = this.wordList[this.currentId][this.secondLang];

    if (currentWord.toLowerCase() === value.toLowerCase()) {
      console.log('correct')
    }
  }

}
