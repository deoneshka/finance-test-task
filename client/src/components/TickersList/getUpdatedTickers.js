import moment from 'moment';

const companyNames = {
  Apple: 'AAPL',
  Alphabet: 'GOOGL',
  Microsoft: 'MSFT',
  Amazon: 'AMZN',
  FaceBook: 'FB',
  Tesla: 'TSLA',
};

const tickerColors = {
  Apple: '#15b312',
  Alphabet: '#cf2746',
  Microsoft: '#27cfcf',
  Amazon: '#121102',
  FaceBook: '#2b09b5',
  Tesla: '#b59009',
};

export const getUpdatedTickers = tickers =>
  tickers
    .map(tickers => {
      const { ticker, last_trade_time, price, change } = tickers;
      const names = Object.keys(companyNames);
      const colors = Object.keys(tickerColors);

      let name;
      let color;

      const change_percent = (
        Math.abs(Number(change)) /
        ((Number(price) + Math.abs(Number(change))) / 100)
      ).toFixed(2);

      names.forEach(key => {
        if (ticker === companyNames[key]) name = key;
      });

      colors.forEach(key => {
        if (name === key) color = tickerColors[key];
      });

      const updatedTime = moment(last_trade_time)
        .local()
        .format('HH:mm:ss, DD.MM.YYYY');

      return {
        ...tickers,
        name,
        color,
        last_trade_time: updatedTime,
        change_percent,
      };
    })
    .sort((a, b) => (a.name < b.name ? -1 : 1));
