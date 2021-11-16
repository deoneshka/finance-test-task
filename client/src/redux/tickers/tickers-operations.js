import {
  initTickersRequest,
  initTickersSuccess,
  initTickersError,
} from './tickers-actions';
import socket from '../../socket/socket';

const fetchTickers = () => dispatch => {
  dispatch(initTickersRequest());
  socket.on('connect', function () {
    socket.emit('start');
    socket.on('ticker', tickers => dispatch(initTickersSuccess(tickers)));
  });

  socket.on('connect_error', function () {
    dispatch(initTickersError());
  });
};

export { fetchTickers };
