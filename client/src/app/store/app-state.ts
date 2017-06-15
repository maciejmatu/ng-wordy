import { Word } from '../models/word';

export const INITIAL_STATE: AppState = {
  langToggled: true,
  wordList: [],
};

export interface AppState {
  langToggled: boolean;
  wordList: Word[]
}
