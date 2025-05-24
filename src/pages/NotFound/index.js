import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      return (
        <>
          <Header />
          <div className="not-found-main-container">
            <Sidebar />
            <div className={isDarkTheme ? 'dark-not-found' : 'light-not-found'}>
              <img
                src={
                  isDarkTheme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
                }
                alt="not found"
                className="not-found"
              />
              <h1 className={isDarkTheme ? 'light-found' : 'dark-found'}>
                Page Not Found
              </h1>
              <p className={isDarkTheme ? 'light-para' : 'dark-para'}>
                We are sorry, the page you requested could not be found.
              </p>
            </div>
          </div>
        </>
      )
    }}
  </ThemeContext.Consumer>
)
export default NotFound
