import {Component, OnInit} from '@angular/core';
import {EventEmitter} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Word} from '../models/word';
import {WordListService} from "../services/wordList.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [
    WordListService
  ]
})
export class CreateComponent implements OnInit {
  newWord: FormGroup;
  activeList: boolean = false;
  wordList: Word[] = [];
  constructor(private fb: FormBuilder,
              private wordListService: WordListService) {
    this.createForm();
  }

  ngOnInit() {
    this.wordListService.getData()
      .subscribe((results) => { this.wordList = results });
  }
  public myFocusTriggeringEventEmitter = new EventEmitter<boolean>();

  createForm() {
    this.newWord = this.fb.group({
      foreignWord: ['', Validators.required],
      nativeWord: ['', Validators.required],
    });
  }

  toggleActiveList() : void{
    this.activeList = !this.activeList;
  }

  addNewWord() : void{
    this.wordList.unshift(this.newWord.value);
    this.wordListService.postData(this.newWord.value)
      .subscribe((results) => { console.log("Results for addNewWord: ", results) });
    this.createForm();
    this.myFocusTriggeringEventEmitter.emit(true);
  }
}
