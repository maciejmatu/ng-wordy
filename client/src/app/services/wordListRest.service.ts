import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Word} from '../models/word';
import {Observable } from "rxjs";
import {API_URL} from "../config";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class WordListRestService {


  constructor(private http: Http) {

  }

  getData() : Observable<Word[]>{
    return this.http.get(`${API_URL}/word/list`)
      .map((res: Response) => res.json())
      .catch(this.handleServerError);
  }

  postData(word: Word) : Observable<Word>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${API_URL}/word/add`,{ word }, options)
      .map((res: Response) => res.json())
      .catch(this.handleServerError)
  }

  private handleServerError(err) : Observable<Response>{
      console.error('Request to "%s" failed', API_URL);
      return Observable.throw(err);
  }
}
