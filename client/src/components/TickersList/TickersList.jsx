import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import {
  getVisibleTickers,
  getAllTickers,
  getFavorite,
  getToggle,
} from '../../redux/tickers/tickers-selectors';
import {
  addToFavorite,
  removeFromFavorite,
} from '../../redux/tickers/tickers-actions';
import FilterTickers from '../FilterTickers';
import ToggleTickers from '../ToggleTickers';
import Icons from '../Icons';
import './TickersList.scss';

export default function TickersList() {
  const dispatch = useDispatch();
  const allTickers = useSelector(getAllTickers);
  const visibleTickers = useSelector(getVisibleTickers);
  const favoriteList = useSelector(getFavorite);
  const toggleValue = useSelector(getToggle);

  const changeStatus = useCallback(
    choosedTicker => {
      if (favoriteList.includes(choosedTicker)) {
        dispatch(removeFromFavorite(choosedTicker));
        return;
      }
      dispatch(addToFavorite(choosedTicker));
    },
    [dispatch, favoriteList],
  );

  const addClassNameModified = (mainClass, value) => {
    const number = Number(value);
    const isFavorite = favoriteList.includes(value);

    return classnames(mainClass, {
      'tickers-item_color_up': number > 0,
      'tickers-item_color_down': number < 0,
      'tickers-item__icon_color_up':
        number > 0 && mainClass === 'tickers-item__icon',
      'tickers-item__icon_color_down':
        number < 0 && mainClass === 'tickers-item__icon',
      'tickers-item__button_color_add':
        !isFavorite && mainClass === 'tickers-item__button',
      'tickers-item__button_color_remove':
        isFavorite && mainClass === 'tickers-item__button',
    });
  };

  return (
    <div className="tickers">
      <h1 className="visually-hidden">Market price of shares</h1>
      {allTickers.length > 0 && (
        <>
          <h2 className="tickers__title">
            {visibleTickers.length === 0
              ? 'There are no companies.'
              : `Last trade time: ${visibleTickers[0].last_trade_time}`}
          </h2>
          <div className="tickers__wrapper">
            <ToggleTickers />
            <FilterTickers
              className={classnames('tickers__filter', {
                'visually-hidden':
                  favoriteList.length === 0 && toggleValue === 'favorite',
              })}
            />
          </div>
        </>
      )}
      <ul className="list tickers__list">
        {visibleTickers.map(
          ({ ticker, name, price, change, change_percent }) => (
            <li className="tickers__item" key={ticker}>
              <button
                type="button"
                title={
                  favoriteList.includes(ticker)
                    ? 'Remove from favorite'
                    : 'Add to favorite'
                }
                className={addClassNameModified('tickers-item__button', ticker)}
                onClick={() => changeStatus(ticker)}
              >
                <Icons
                  className="tickers-button__icon"
                  spriteId={
                    favoriteList.includes(ticker) ? 'close-icon' : 'add-icon'
                  }
                />
              </button>
              <p
                className={classnames(
                  'tickers-item tickers-item__ticker',
                  `tickers-item__ticker_${name.toLowerCase()}`,
                )}
              >
                {ticker}
              </p>
              <p className="tickers-item tickers-item__name">{name}</p>
              <p className="tickers-item tickers-item__text">{price} $</p>
              <p
                className={addClassNameModified(
                  'tickers-item tickers-item__change',
                  change,
                )}
              >
                {change} $
              </p>
              <div className="tickers-item">
                <Icons
                  className={addClassNameModified('tickers-item__icon', change)}
                  spriteId={Number(change) > 0 ? 'arrow-up' : 'arrow-down'}
                />
                <p
                  className={addClassNameModified(
                    'tickers-item__percent',
                    change,
                  )}
                >
                  {change_percent} %
                </p>
              </div>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
