import { createAction } from '@reduxjs/toolkit';

export const initTickersRequest = createAction('contacts/fetchTickersRequest');
export const initTickersSuccess = createAction('contacts/fetchTickersSuccess');
export const initTickersError = createAction('contacts/fetchTickersError');
