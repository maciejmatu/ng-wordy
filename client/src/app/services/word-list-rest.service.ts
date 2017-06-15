import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Word } from '../models/word';
import { Observable } from 'rxjs';
import { API_URL } from '../config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

interface Options {
  headers: Headers
}

@Injectable()
export class WordListRestService {
  options: Options;

  constructor(private http: Http) {
    this.options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/json'})
    });
  }

  getData(): Observable<Word[]> {
    return this.http.get(`${API_URL}/word/list`)
      .map((res: Response) => res.json())
      .catch(this.handleServerError);
  }

  postData(word: Word): Observable<Word> {
    return this.http.post(`${API_URL}/word/add`, { word }, this.options)
      .map((res: Response) => res.json())
      .catch(this.handleServerError);
  }

  updateData(listWord: Word[]) {
    return this.http.put(`${API_URL}/word/list`, { list: listWord },  this.options)
      .map((res: Response) => res.json())
      .catch(this.handleServerError);
  }

  removeData(listId: string[]) {
    const options = Object.assign({} , this.options, {body: { list: listId }});

    return this.http.delete(`${API_URL}/word/list`, options)
      .map((res: Response) => res.json())
      .catch(this.handleServerError);
  }

  private handleServerError(err): Observable<Response> {
      console.error('Request to "%s" failed', API_URL);
      return Observable.throw(err);
  }
}
