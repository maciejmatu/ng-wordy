import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateWord, Word } from '../models/word';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { WordListActions } from '../services/word-list.actions';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit, OnDestroy {
  @select('wordList') wordList$: Observable<Word[]>;
  subscription;
  wordList: CreateWord[];
  newWord: FormGroup;
  activeList = false;
  public myFocusTriggeringEventEmitter = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder,
              private wordListActions: WordListActions) {
  }

  ngOnInit() {
    this.createForm();
    this.subscription = this.wordList$
      .map(wordList => wordList.map(word => Object.assign({}, word, { edit: false })))
      .subscribe(wordList => this.wordList = [...wordList].reverse());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.newWord = this.fb.group({
      foreignWord: ['', Validators.required],
      nativeWord: ['', Validators.required],
    });
  }

  toggleActiveList(): void {
    this.activeList = !this.activeList;
  }

  addNewWord(): void {
    this.wordListActions.postData(this.newWord.value);
    this.createForm();
    this.myFocusTriggeringEventEmitter.emit(true);
  }
}
