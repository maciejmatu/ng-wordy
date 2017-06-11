import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {CreateWord} from '../models/word';
import {FormBuilder, FormGroup} from '@angular/forms';
import {WordListService} from '../services/wordList.service';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})

export class WordComponent implements OnInit {
  @Input() word: CreateWord;
  @Output() editEvent: EventEmitter<CreateWord> = new EventEmitter<CreateWord>();
  updateWord: FormGroup;

  constructor(private fb: FormBuilder,
              private wordListService: WordListService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.updateWord = this.fb.group({
      foreignWord: '',
      nativeWord: '',
    });
  }

  toggleEdit() {
    this.editEvent.emit(this.word);
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

  remove() {
    this.wordListService.removeWordInDataStore(this.word.id);
  }
}
