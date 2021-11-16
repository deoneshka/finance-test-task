import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeToogle,
  changeFilter,
} from '../../redux/tickers/tickers-actions';
import { getToggle } from '../../redux/tickers/tickers-selectors';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './ToggleTickers';

export default function ToogleTickers() {
  const dispatch = useDispatch();
  const toggleValue = useSelector(getToggle);

  const handleChange = useCallback(
    e => {
      dispatch(changeToogle(e.target.value));
      dispatch(changeFilter(''));
    },
    [dispatch],
  );

  return (
    <ToggleButtonGroup
      color="primary"
      value={toggleValue}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="all">All</ToggleButton>
      <ToggleButton value="favorite">Favorite</ToggleButton>
    </ToggleButtonGroup>
  );
}
