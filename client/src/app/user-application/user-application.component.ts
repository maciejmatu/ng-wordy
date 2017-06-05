import {Component, OnInit} from '@angular/core';
import {Router } from "@angular/router";
import {WordListService} from "../services/wordList.service";
import {Word} from "../models/word";

@Component({
  selector: 'app-user-application',
  templateUrl: 'user-application.component.html',
  styleUrls: ['user-application.component.scss'],
  providers: [
    WordListService
  ]
})


export class UserApplicationComponent implements OnInit{

  active: boolean = false;
  constructor(private router: Router,
              private wordListService: WordListService){
    this.router.navigate(['learn']);
  }

  ngOnInit() {
    this.wordListService.getData()
  }

  menuToggle(){
    this.active = !this.active;
  }
}
