

import { useEffect, useState } from 'react';
import './App.css';

const coinMeta = {
  bitcoin: {
    name: 'بيتكوين',
    symbol: 'BTC',
    icon: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
  },
  ethereum: {
    name: 'إيثريوم',
    symbol: 'ETH',
    icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
  },
  solana: {
    name: 'سولانا',
    symbol: 'SOL',
    icon: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
  },
};

function App() {
  // ...existing code...
  const [amount, setAmount] = useState('');
  const [isSell, setIsSell] = useState(false);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);

  const mainIds = ['bitcoin', 'ethereum', 'solana'];
  const moreIds = ['binancecoin', 'ripple', 'cardano', 'dogecoin', 'tron', 'polkadot', 'litecoin', 'polygon', 'shiba-inu'];

  useEffect(() => {
    async function fetchPrices(ids) {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids.join(',')}`
        );
        const data = await res.json();
        const coinsData = data.map((coin) => ({
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          price: coin.current_price,
          change: coin.price_change_percentage_24h?.toFixed(2),
          icon: coin.image,
        }));
        setCoins(coinsData);
      } catch {
        setCoins([]);
      }
      setLoading(false);
    }
    fetchPrices(showMore ? [...mainIds, ...moreIds] : mainIds);
  }, [showMore]);

    return (
      <div>
        <h1
          style={{
            textAlign: 'center',
            margin: '32px 0 12px 0',
            fontWeight: 'bold',
            fontSize: '7rem',
            letterSpacing: '2px',
            color: '#F7931A',
            textShadow: '0 2px 16px #f7c873',
            fontFamily: 'Montserrat, Arial Black, Arial, sans-serif',
          }}
        >
          Crypto Gate
        </h1>
        <div className="iraqcoin-app">
          <div className="exchange-box">
            <div className="exchange-header">
              <button className={`tab${isSell ? ' active' : ' inactive'}`} onClick={() => setIsSell(true)}>بيع</button>
              <button className={`tab${!isSell ? ' active' : ' inactive'}`} onClick={() => setIsSell(false)}>شراء</button>
            </div>
            <div className="exchange-form">
              <div className="form-row">
                <label>ستدفع</label>
                <div className="currency-box">
                  {isSell ? (
                    <>
                      <img src="https://assets.coingecko.com/coins/images/325/small/Tether.png" alt="USDT" style={{ width: 32, height: 32, marginLeft: 8 }} />
                      <span style={{ fontWeight: 'bold', fontSize: '1.1rem', marginLeft: 4 }}>USDT</span>
                    </>
                  ) : (
                    <>
                      <img src="https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png" alt="USD Coin" style={{ width: 32, height: 32, marginLeft: 8 }} />
                      <span style={{ fontWeight: 'bold', fontSize: '1.1rem', marginLeft: 4, color: '#000' }}>USD</span>
                    </>
                  )}
                  <input
                    type="number"
                    placeholder="0.00"
                    className="amount-input"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row">
                <label>ستستلم</label>
                <div className="currency-box">
                  {isSell ? (
                    <>
                      <img src="https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png" alt="USD Coin" style={{ width: 32, height: 32, marginLeft: 8 }} />
                      <span style={{ fontWeight: 'bold', fontSize: '1.1rem', marginLeft: 4, color: '#000' }}>USD</span>
                    </>
                  ) : (
                    <>
                      <img src="https://assets.coingecko.com/coins/images/325/small/Tether.png" alt="USDT" style={{ width: 32, height: 32, marginLeft: 8 }} />
                      <span style={{ fontWeight: 'bold', fontSize: '1.1rem', marginLeft: 4 }}>USDT</span>
                    </>
                  )}
                  <input
                    type="number"
                    placeholder="0.00"
                    className="amount-input"
                    value={amount ? (isSell ? (parseFloat(amount) * 1.02).toFixed(2) : (parseFloat(amount) * 0.98).toFixed(2)) : ''}
                    readOnly
                  />
                </div>
              </div>
              <div className="details-box">
                <h4>تفاصيل الصرف</h4>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>العمولة 2%</div>
              </div>
            </div>
          </div>
          <div className="main-prices">
            <h2 className="title">أسعار العملات المشفرة الرئيسية</h2>
            <table className="prices-table">
              <thead>
                <tr>
                  <th>اليوم</th>
                  <th>السعر الحالي</th>
                  <th>العملة الرقمية</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={3}>جاري تحميل الأسعار...</td></tr>
                ) : coins.length === 0 ? (
                  <tr><td colSpan={3}>تعذر جلب الأسعار</td></tr>
                ) : (
                  coins.map((coin) => (
                    <tr key={coin.symbol}>
                      <td style={{ color: 'green', fontWeight: 'bold' }}>{coin.change}%</td>
                      <td style={{ fontWeight: 'bold' }}>${coin.price.toLocaleString()}</td>
                      <td style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'right' }}>
                        {coin.name}
                        <span style={{ color: '#888', marginRight: '8px' }}>{coin.symbol}</span>
                        <img src={coin.icon} alt={coin.symbol} style={{ width: 32, height: 32 }} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <button className="prices-btn" onClick={() => setShowMore((prev) => !prev)}>
              {showMore ? 'إخفاء العملات الإضافية' : 'أسعار العملات'}
            </button>
          </div>
        </div>
        <div style={{textAlign: 'center', margin: '48px 0 0 0', fontSize: '1.15rem', color: '#5a4be7', fontWeight: '500', background: '#f5f3ff', borderRadius: '18px', padding: '18px 12px', boxShadow: '0 2px 12px #e0d8fa'}}>
          انطلق بثقة في عالم العملات الرقمية منصتك الآمنة والحديثة لبيع وشراء العملات الرقمية بسهولة وشفافية<br />استمتع بأفضل الأسعار وسرعة التنفيذ ودعم متواصل<br />معنا أنت في قلب المستقبل المالي ابدأ الآن وكن جزءًا من الثورة الرقمية
        </div>
    </div>
    );
}

export default App;
