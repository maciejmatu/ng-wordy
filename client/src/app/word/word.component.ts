import { Component, OnInit, Input } from '@angular/core';
import { CreateWord } from '../models/word';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WordListService } from '../services/wordList.service';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})

export class WordComponent implements OnInit {
  @Input() word: CreateWord;
  updateWord: FormGroup;
  clickedFirstTime = false;

  constructor(private fb: FormBuilder,
              private wordListService: WordListService) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.updateWord = this.fb.group({
      foreignWord: '',
      nativeWord: '',
    });
  }

  save() {
    this.word.edit = false;
    this.word.foreignWord = this.updateWord.value.foreignWord || this.word.foreignWord;
    this.word.nativeWord = this.updateWord.value.nativeWord || this.word.nativeWord;
    this.wordListService.updateWordInDataStore(this.word);
    this.createForm();
  }

  cancel() {
    this.word.edit = false;
    this.createForm();
  }

  toggleEdit() {
    if(!this.word.edit){
      this.clickedFirstTime = true;
      this.word.edit = true;
    }
  }

  clickOutside(){
    if(!this.clickedFirstTime){
      this.word.edit = false;
    }else{
      this.clickedFirstTime = false;
    }
  }

  remove() {
    this.wordListService.removeWordInDataStore(this.word.id);
  }
}
