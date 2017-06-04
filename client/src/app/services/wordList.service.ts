import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Word} from '../models/word';
import {Observable} from "rxjs";
import {API_URL} from "../config";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class WordListService {

  constructor(private http: Http) {
  }

  getData(): Observable<[Word]> {
    return this.http.get(`${API_URL}/listWord`)
      .map((res: Response) => res.json())
      .catch(this.handleServerError);
  }

  postData(word: Word): Observable<Word> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${API_URL}/newWord`,{ word }, options)
      .map((res: Response) => res.json())
      .catch(this.handleServerError);
  }

  private handleServerError(error: Response) {
    console.log('Server error: ', Observable.throw(error.json().error));
    return Observable.throw(error.json().error || 'Server error');
  }
}
