import { configureStore, combineReducers } from '@reduxjs/toolkit';
import tickersReducer from './tickers/tickers-reducer';

const rootReducer = combineReducers({
  tickers: tickersReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
});

// eslint-disable-next-line import/no-anonymous-default-export
export default { store };
