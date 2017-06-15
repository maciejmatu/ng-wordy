import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WordListActions } from '../services/word-list.actions';

@Component({
  selector: 'app-user-application',
  templateUrl: 'user-application.component.html',
  styleUrls: ['user-application.component.scss']
})

export class UserApplicationComponent implements OnInit {
  active = false;

  constructor(private router: Router,
              private wordListActions: WordListActions) {
    this.router.navigate(['learn']);
  }

  ngOnInit() {
    this.wordListActions.getWordList();
  }

  menuToggle() {
    this.active = !this.active;
  }
}
