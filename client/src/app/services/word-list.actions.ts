import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store/app-state';
import { WordListRestService } from './word-list-rest.service';
import { Word } from '../models/word';

@Injectable()
export class WordListActions {
  static readonly REQUEST_WORD_LIST_SUCCESS = 'REQUEST_WORD_LIST_SUCCESS';
  static readonly REQUEST_ADD_WORD = 'REQUEST_ADD_WORD';
  static readonly REQUEST_UPDATE_WORD = 'REQUEST_UPDATE_WORD';
  static readonly REQUEST_REMOVE_WORD = 'REQUEST_REMOVE_WORD';

  constructor(private ngRedux: NgRedux<AppState>,
              private wordListRestService: WordListRestService){

  }

  getWordList(){
    this.wordListRestService.getData().subscribe(wordList => {
      this.ngRedux.dispatch({
        type: WordListActions.REQUEST_WORD_LIST_SUCCESS,
        wordList
      });
    });
  }

  postData(word: Word) {
    this.wordListRestService.postData(word).subscribe(word => {
      this.ngRedux.dispatch({
        type: WordListActions.REQUEST_ADD_WORD,
        word
      });
    });
  }

  updateWord(word: Word){
    this.wordListRestService.updateWord(word).subscribe(word => {
      this.ngRedux.dispatch({
        type: WordListActions.REQUEST_UPDATE_WORD,
        word
      });
    });
  }

  removeWord(id: string){
    this.wordListRestService.removeWord(id).subscribe(word => {
      this.ngRedux.dispatch({
        type: WordListActions.REQUEST_REMOVE_WORD,
        word
      });
    });
  }
}
