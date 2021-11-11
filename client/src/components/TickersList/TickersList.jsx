import { useSelector } from 'react-redux';
import { getAllTickers } from '../../redux/tickers/tickers-selectors';
import { getUpdatedTickers } from './getUpdatedTickers';
import Icons from '../Icons';
import './TickersList.scss';

export default function TickersList() {
  const tickers = useSelector(getAllTickers);
  const updatedTickers = getUpdatedTickers(tickers);

  return (
    <div className="tickers">
      <h1 className="visually-hidden">Market price of shares</h1>
      {updatedTickers.length > 0 && (
        <h2 className="tickers__title">
          Last trade time: {updatedTickers[0].last_trade_time}
        </h2>
      )}
      <ul className="list tickers__list">
        {updatedTickers.map(
          ({ ticker, color, name, price, change, change_percent }) => (
            <li className="tickers__item" key={ticker}>
              <button type="button" className="tickers-item__button">
                <Icons className="tickers-button__icon" id="add-icon" />
              </button>
              <p
                style={{ background: color }}
                className="tickers-item tickers-item__ticker"
              >
                {ticker}
              </p>
              <p className="tickers-item tickers-item__name">{name}</p>
              <p className="tickers-item tickers-item__text">{price} $</p>
              <p
                className={`tickers-item tickers-item__change ${
                  Number(change) > 0
                    ? 'tickers-item_color_up'
                    : 'tickers-item_color_down'
                }`}
              >
                {change} $
              </p>
              <div className="tickers-item">
                <Icons
                  className={`tickers-item__icon ${
                    Number(change) > 0
                      ? 'tickers-item__icon_color_up'
                      : 'tickers-item__icon_color_down'
                  }`}
                  id={Number(change) > 0 ? 'arrow-up' : 'arrow-down'}
                />
                <p
                  className={`tickers-item__percent ${
                    Number(change) > 0
                      ? 'tickers-item_color_up'
                      : 'tickers-item_color_down'
                  }`}
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
