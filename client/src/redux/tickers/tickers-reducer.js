import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  // initTickersRequest,
  initTickersSuccess,
  // initTickersError,
} from './tickers-actions';

const tickers = createReducer([], {
  [initTickersSuccess]: (_, { payload }) => payload,
});

// const loading = createReducer(false, {
//   [initTickersRequest]: () => true,
//   [initTickersSuccess]: () => false,
//   [initTickersError]: () => false,
// });

export default combineReducers({
  tickers,
});

// export default combineReducers({
//   tickers,
//   loading,
// });
