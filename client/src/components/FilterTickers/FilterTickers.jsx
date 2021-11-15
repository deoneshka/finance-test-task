import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/tickers/tickers-actions';
import { getFilter } from '../../redux/tickers/tickers-selectors';
import TextField from '@mui/material/TextField';
import './FilterTickers.scss';

export default function FilterContacts({ className }) {
  const dispatch = useDispatch();
  const value = useSelector(getFilter);

  const onChange = useCallback(
    e => dispatch(changeFilter(e.target.value)),
    [dispatch],
  );

  return (
    <TextField
      id="standard-basic"
      label="find company by name"
      variant="standard"
      value={value}
      onChange={onChange}
      className={className}
    />
  );
}
