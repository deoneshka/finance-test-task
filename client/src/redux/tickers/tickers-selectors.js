import { createSelector } from '@reduxjs/toolkit';
import moment from 'moment';

const companyNames = {
  Apple: 'AAPL',
  Alphabet: 'GOOGL',
  Microsoft: 'MSFT',
  Amazon: 'AMZN',
  FaceBook: 'FB',
  Tesla: 'TSLA',
};

export const getLoading = state => state.tickers.loading;
export const getAllTickers = state => state.tickers.tickers;
export const getFilter = state => state.tickers.filter;
export const getFavorite = state => state.tickers.favorite;
export const getToggle = state => state.tickers.toggle;

export const getUpdatedTickers = createSelector([getAllTickers], tickers =>
  tickers
    .map(tickers => {
      let name;
      const { ticker, last_trade_time, price, change } = tickers;
      const names = Object.keys(companyNames);
      const absoluteValue = Math.abs(Number(change));

      const change_percent = (
        absoluteValue /
        ((Number(price) + absoluteValue) / 100)
      ).toFixed(2);

      names.forEach(key => {
        if (ticker === companyNames[key]) name = key;
      });

      const updatedTime = moment(last_trade_time)
        .local()
        .format('HH:mm:ss, DD.MM.YYYY');

      return {
        ...tickers,
        name,
        last_trade_time: updatedTime,
        change_percent,
      };
    })
    .sort((a, b) => (a.name < b.name ? -1 : 1)),
);

export const getVisibleTickers = createSelector(
  [getUpdatedTickers, getFilter],
  (tickers, filter) => {
    const normalizedFilter = filter.toLowerCase();

    return tickers.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter),
    );
  },
);

export const getFavoriteTickers = createSelector(
  [getVisibleTickers, getFavorite],
  (tickers, favoriteTickers) => {
    return tickers.filter(({ ticker }) => favoriteTickers.includes(ticker));
  },
);
