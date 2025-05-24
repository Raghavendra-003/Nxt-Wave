import {IoMdClose} from 'react-icons/io'
import './index.css'

const PremiumBanner = ({onClickCloseBtn, ...props}) => (
  <div className="banner-container" data-testid={props['data-testid']}>
    <div className="banner-text">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        width="130px"
        alt="nxt watch logo"
      />
      <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
      <button className="get-btn">GET IT NOW</button>
    </div>
    <button className="cross-btn" onClick={onClickCloseBtn} data-testid="close">
      <IoMdClose size={24} />
    </button>
  </div>
)
export default PremiumBanner
