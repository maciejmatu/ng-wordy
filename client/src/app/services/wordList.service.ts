import {Injectable} from '@angular/core';
import {Word} from '../models/word';
import {Observable, Subject, BehaviorSubject} from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {WordListRestService} from './wordListRest.service';

@Injectable()
export class WordListService {
  wordList$: Observable<Word[]>;
  private wordList : Subject<Word[]>;
  private dataStore: {
    wordList: Word[]
  };

  constructor(private wordListRestService: WordListRestService) {
    this.dataStore = { wordList: [] };
    this.wordList = <Subject<Word[]>>new BehaviorSubject([]);
    this.wordList$ = this.wordList.asObservable();
  }

  getData(){
    this.wordListRestService.getData().subscribe(data => {
        this.dataStore.wordList = data;
        this.wordList.next(Object.assign({}, this.dataStore).wordList);
      });
  }

  postData(word: Word) {
    this.wordListRestService.postData(word).subscribe(data => {
        this.dataStore.wordList.push(data);
        this.wordList.next(Object.assign({}, this.dataStore).wordList);
      });
  }

  updateWordInDataStore(word: Word){
    this.dataStore.wordList = this.dataStore.wordList
      .map(item => (item.id == word.id) ? word : item);

    this.wordList.next(Object.assign({}, this.dataStore).wordList);
  }

  removeWordInDataStore(id: string){
    this.dataStore.wordList = this.dataStore.wordList
      .filter(item => item.id != id);

    this.wordList.next(Object.assign({}, this.dataStore).wordList);
  }
}
