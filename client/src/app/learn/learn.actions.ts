import { Injectable } from '@angular/core';
import { Action } from 'redux';

@Injectable()
export class LearnActions {
  static readonly TOGGLE_LANG = 'TOGGLE_LANG';

  toggleLang(): Action {
    return { type: LearnActions.TOGGLE_LANG };
  }
}
