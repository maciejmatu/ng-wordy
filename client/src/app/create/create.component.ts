import {Component, OnInit} from '@angular/core';
import {EventEmitter} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Word} from '../models/word';
import {WordListService} from "../services/wordList.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  newWord: FormGroup;
  activeList: boolean = false;
  wordList: Word[];

  constructor(private fb: FormBuilder,
              private wordListService: WordListService) {
    this.createForm();
    this.wordListService.wordList$.subscribe( results =>{
      this.wordList = results;
    });
  }

  ngOnInit() {}

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
    this.wordListService.postData(this.newWord.value);
    this.createForm();
    this.myFocusTriggeringEventEmitter.emit(true);
  }
}
