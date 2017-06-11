import { Action } from 'redux';
import { LearnActions } from './learn/learn.actions';

export interface AppState {
  langToggled: boolean;
}

export const INITIAL_STATE: AppState = {
  langToggled: true
};

export function rootReducer(lastState: AppState, action: Action): AppState {
  switch (action.type) {
    case LearnActions.TOGGLE_LANG:
      return { langToggled: !lastState.langToggled };
    default:
      return lastState;
  }
}
