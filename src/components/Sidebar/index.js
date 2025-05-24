import {Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistPlay} from 'react-icons/md'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const Sidebar = () => (
  <ThemeContext.Consumer>
    {({isDarkTheme}) => (
      <div className={isDarkTheme ? 'dark-sidebar' : 'light-sidebar'}>
        <ul className="sidebar-menu">
          <Link to="/" className="icons-text">
            <IoMdHome size={20} color="#64748b" />
            <li className={isDarkTheme ? 'light-text' : 'dark-text'}>Home</li>
          </Link>

          <Link to="/trending" className="icons-text">
            <FaFire size={20} color="#64748b" />
            <li className={isDarkTheme ? 'light-text' : 'dark-text'}>
              Trending
            </li>
          </Link>

          <Link to="/gaming" className="icons-text">
            <SiYoutubegaming size={20} color="#64748b" />
            <li className={isDarkTheme ? 'light-text' : 'dark-text'}>Gaming</li>
          </Link>

          <Link to="/saved-videos" className="icons-text">
            <MdPlaylistPlay size={20} color="#64748b" />
            <li className={isDarkTheme ? 'light-text' : 'dark-text'}>
              Saved videos
            </li>
          </Link>
        </ul>

        <div className="contact-container">
          <p className={isDarkTheme ? 'light-head' : 'dark-head'}>CONTACT US</p>
          <div className="icons-link">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              alt="facebook logo"
              width="20"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
              alt="twitter logo"
              width="20"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
              alt="linked in logo"
              width="20"
            />
          </div>
          <p className={isDarkTheme ? 'light-paragraph' : 'dark-paragraph'}>
            Enjoy! Now to see your channels and recommendations!
          </p>
        </div>
      </div>
    )}
  </ThemeContext.Consumer>
)
export default Sidebar
