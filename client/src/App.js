import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import { fetchTickers } from './redux/tickers/tickers-operations';
import { getLoading, getError } from './redux/tickers/tickers-selectors';
import Container from './components/Container';
import TickersList from './components/TickersList';

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoading);
  const isError = useSelector(getError);

  useEffect(() => {
    dispatch(fetchTickers());
  }, [dispatch]);

  return (
    <Container>
      {isLoading && (
        <Loader
          className="loader"
          type="Audio"
          color="#00BFFF"
          height={200}
          width={200}
        />
      )}
      {!isLoading && !isError && <TickersList />}
      {isError && <h2 className="error">Server connection error.</h2>}
    </Container>
  );
}
