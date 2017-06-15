import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WordListService } from '../services/word-list.service';
import { WordListRestService } from '../services/word-list-rest.service';

@Component({
  selector: 'app-user-application',
  templateUrl: 'user-application.component.html',
  styleUrls: ['user-application.component.scss'],
  providers: [
    WordListRestService,
    WordListService
  ]
})

export class UserApplicationComponent implements OnInit {
  active = false;

  constructor(private router: Router,
              private wordListService: WordListService) {
    this.router.navigate(['learn']);
  }

  ngOnInit() {
    this.wordListService.getData();
  }
  updateAndRemove() {
    this.wordListService.updateData();
    this.wordListService.removeData();
  }

  menuToggle() {
    this.active = !this.active;
  }
}
