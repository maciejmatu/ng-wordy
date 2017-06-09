import {Component, OnInit} from '@angular/core';
import {EventEmitter} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {CreateWord} from '../models/word';
import {WordListService} from "../services/wordList.service";


@Component({
  host: {
    '(document:click)': 'onClick($event)',
  },
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  wordList: CreateWord[];
  newWord: FormGroup;
  activeList: boolean = false;
  clickedWord: boolean = false;

  constructor(private fb: FormBuilder,
              private wordListService: WordListService) {
    this.createForm();

    this.wordListService.wordList$
      .subscribe(results => {
        let wordList = results.slice().reverse();
        this.wordList = wordList.map(item => Object.assign({},item, {edit: false}));
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

  handleEditEvent(word){
    this.clickedWord = true;
    if(word.edit) return;
    this.setAllWordEditFalse();
    word.edit = true;
  }

  onClick(event){
    if(this.clickedWord){
      this.clickedWord = false;
      return
    }else{
      this.setAllWordEditFalse();
    }

  }

  private setAllWordEditFalse(){
    this.wordList.map(item => item.edit = false);
  }
}
