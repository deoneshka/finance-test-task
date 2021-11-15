import { createAction } from '@reduxjs/toolkit';

export const initTickersRequest = createAction('tickers/fetchTickersRequest');
export const initTickersSuccess = createAction('tickers/fetchTickersSuccess');
export const initTickersError = createAction('tickers/fetchTickersError');

export const changeFilter = createAction('tickers/changeFilter');
export const addToFavorite = createAction('tickers/addToFavorite');
export const removeFromFavorite = createAction('tickers/removeFromFavorite');
export const changeToogle = createAction('tickers/changeToogle');
