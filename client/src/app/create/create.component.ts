import {Component, OnInit} from '@angular/core';
import {EventEmitter} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Word} from '../models/word';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  newWord: FormGroup;
  activeList: boolean = false;
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
  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
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
    this.createForm();
    this.myFocusTriggeringEventEmitter.emit(true);
  }
}
