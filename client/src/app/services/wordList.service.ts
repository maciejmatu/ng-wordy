import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
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

  private handleServerError(error: Response) {
    console.log('Server error: ', Observable.throw(error.json().error));
    return Observable.throw(error.json().error || 'Server error');
  }
}
