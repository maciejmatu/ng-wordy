import { createStore, applyMiddleware, compose, GenericStoreEnhancer } from 'redux';
import { AppState } from './app-state';
import { rootReducer } from './root-reducer';

declare let window:any;

const devToolsExtension: GenericStoreEnhancer = (window.devToolsExtension)
  ? window.devToolsExtension() : (f) => f;

export const store = createStore<AppState>(rootReducer, compose(devToolsExtension) as GenericStoreEnhancer);
