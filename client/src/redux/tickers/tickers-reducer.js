import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  initTickersRequest,
  initTickersSuccess,
  initTickersError,
  changeFilter,
  addToFavorite,
  removeFromFavorite,
  changeToogle,
} from './tickers-actions';

const tickers = createReducer([], {
  [initTickersSuccess]: (_, { payload }) => payload,
});

const filter = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});

const favorite = createReducer([], {
  [addToFavorite]: (state, { payload }) => [...state, payload],
  [removeFromFavorite]: (state, { payload }) => {
    const index = state.indexOf(payload);
    state.splice(index, 1);

    return state;
  },
});

const loading = createReducer(true, {
  [initTickersRequest]: () => true,
  [initTickersSuccess]: () => false,
  [initTickersError]: () => false,
});

const toggle = createReducer('all', {
  [changeToogle]: (_, { payload }) => payload,
});

const error = createReducer(false, {
  [initTickersError]: () => true,
  [initTickersSuccess]: () => false,
});

export default combineReducers({
  tickers,
  filter,
  loading,
  favorite,
  toggle,
  error,
});
