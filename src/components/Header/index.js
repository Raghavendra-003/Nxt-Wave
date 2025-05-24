import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import ThemeContext from '../../context/ThemeContext'

import './index.css'

class Header extends Component {
  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {({isDarkTheme, toggleTheme}) => (
          <div
            className={
              isDarkTheme ? 'header-dark-container' : 'header-light-container'
            }
          >
            <Link to="/">
              <img
                src={
                  isDarkTheme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                }
                width="100px"
                alt="website logo"
                className="logo-img"
              />
            </Link>
            <div className="theme-logout-card">
              <button
                onClick={toggleTheme}
                className="theme-btn"
                data-testid="theme"
              >
                <img
                  src={
                    isDarkTheme
                      ? 'https://assets.ccbp.in/frontend/react-js/light-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/dark-theme-img.png'
                  }
                  width="30px"
                  alt="theme"
                />
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                width="30px"
              />
              <div className="popup-container">
                <Popup
                  modal
                  trigger={
                    <button
                      className={isDarkTheme ? 'dark-btn' : 'light-btn'}
                      type="button"
                      onClick={this.onClickLogout}
                    >
                      Logout
                    </button>
                  }
                  className="popup-content"
                >
                  {close => (
                    <>
                      <div
                        className={
                          isDarkTheme
                            ? 'popup-content-light'
                            : 'popup-content-dark'
                        }
                      >
                        <p
                          className={isDarkTheme ? 'dark-popup' : 'light-popup'}
                        >
                          Are you sure, you want to logout?
                        </p>
                        <div className="popup-btn">
                          <button
                            type="button"
                            className={
                              isDarkTheme
                                ? 'cancel-btn-dark'
                                : 'cancel-btn-light'
                            }
                            onClick={() => close()}
                          >
                            Cancel
                          </button>

                          <button
                            type="button"
                            className="confirm-btn"
                            onClick={this.onClickLogout}
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </Popup>
              </div>
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

export default withRouter(Header)
