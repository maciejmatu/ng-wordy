import { AppState, INITIAL_STATE } from './app-state';
import { Action } from 'redux';
import { LearnActions } from '../learn/learn.actions';
import { WordListActions } from '../services/word-list.actions';



const langToggled = (lastState) : AppState =>{
  return Object.assign({}, lastState, {
    langToggled: !lastState.langToggled
  })
};

const storeWordList = (lastState, action) : AppState =>{
  return Object.assign({}, lastState, {
    wordList: action.wordList
  })
};

const addWordToStoreWordList = (lastState, action) : AppState =>{
  return Object.assign({}, lastState, {
    wordList: [...lastState.wordList, action.word]
  })
};

const updateWordInStoreWordList = (lastState, action) : AppState =>{
  const wordList = [...lastState.wordList.map(word => (word.id === action.word.id) ? action.word : word)];

  return Object.assign({}, lastState, {
    wordList
  })
};

const removeWordInDataStore = (lastState, action) : AppState =>{
  const wordList = [...lastState.wordList.filter(item => item.id !== action.word.id)];

  return Object.assign({}, lastState, {
    wordList
  })
};

export const rootReducer = (lastState: AppState = INITIAL_STATE, action: Action): AppState =>{
  switch (action.type){
    case LearnActions.TOGGLE_LANG:
      return langToggled(lastState);
    case WordListActions.REQUEST_WORD_LIST_SUCCESS:
      return storeWordList(lastState, action);
    case WordListActions.REQUEST_ADD_WORD:
      return addWordToStoreWordList(lastState, action);
    case WordListActions.REQUEST_UPDATE_WORD:
      return updateWordInStoreWordList(lastState, action);
    case WordListActions.REQUEST_REMOVE_WORD:
      return removeWordInDataStore(lastState, action);
    default:
      return lastState
  }
};
