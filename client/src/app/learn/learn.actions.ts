import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store/app-state';

@Injectable()
export class LearnActions {
  static readonly TOGGLE_LANG = 'TOGGLE_LANG';

  constructor(private ngRedux: NgRedux<AppState>){

  }
  toggleLanguage() {
    this.ngRedux.dispatch({ type: LearnActions.TOGGLE_LANG });
  }
}
