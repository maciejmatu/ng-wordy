import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Word} from '../models/word';
import {Observable, Subject, BehaviorSubject} from 'rxjs';
import {API_URL} from '../config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class WordListService {
  wordList$: Observable<Word[]>;
  private wordList : Subject<Word[]>;
  private dataStore: {
    wordList: Word[]
  };

  constructor(private http: Http) {
    this.dataStore = { wordList: [] };
    this.wordList = <Subject<Word[]>>new BehaviorSubject([]);
    this.wordList$ = this.wordList.asObservable();
  }

  getData(){
    this.http.get(`${API_URL}/listWord`)
      .map((res: Response) => res.json()).subscribe(data => {
        this.dataStore.wordList = data;
        this.wordList.next(Object.assign({}, this.dataStore).wordList);
      }, error => this.handleServerError);
  }

  postData(word: Word) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post(`${API_URL}/newWord`,{ word }, options)
      .map((res: Response) => res.json()).subscribe(data => {
        this.dataStore.wordList.push(data);
        this.wordList.next(Object.assign({}, this.dataStore).wordList);
      }, error => this.handleServerError);
  }

  private handleServerError() {
    console.log('Could not load words');
  }
}
