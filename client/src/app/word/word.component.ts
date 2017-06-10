import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {CreateWord} from '../models/word';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})

export class WordComponent implements OnInit {
  @Input() word: CreateWord;
  @Output() editEvent: EventEmitter<CreateWord> = new EventEmitter<CreateWord>();
  updateWord: FormGroup;

  constructor(private fb: FormBuilder) {
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

  toggleEdit(){
    this.editEvent.emit(this.word);
  }

  save(){
    this.word.edit = false;
    this.createForm();
  }

  cancel(){
    this.word.edit = false;
    this.createForm();
  }

  remove(){

  }
}
