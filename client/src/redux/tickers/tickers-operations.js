import {
  initTickersRequest,
  initTickersSuccess,
  // initTickersError,
} from './tickers-actions';
import socket from '../../socket/socket';

const fetchTickers = () => dispatch => {
  dispatch(initTickersRequest());
  socket.emit('start');
  socket.on('ticker', tickers => dispatch(initTickersSuccess(tickers)));
};

export { fetchTickers };
