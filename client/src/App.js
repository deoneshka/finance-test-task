import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickers } from './redux/tickers/tickers-operations';
import { getLoading } from './redux/tickers/tickers-selectors';
import Container from './components/Container';
import TickersList from './components/TickersList';

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoading);

  useEffect(() => {
    dispatch(fetchTickers());
  }, [dispatch]);

  return (
    <Container>
      {isLoading && <h2>Подключаемся к серверу</h2>}
      {!isLoading && <TickersList />}
    </Container>
  );
}
