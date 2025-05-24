import {Component} from 'react'
import {SiYoutubegaming} from 'react-icons/si'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import ThemeContext from '../../context/ThemeContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Gaming extends Component {
  state = {
    gamingVideos: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedVideos = data.videos.map(video => ({
        id: video.id,
        title: video.title,
        thumbnailUrl: video.thumbnail_url,
        viewCount: video.view_count,
      }))
      this.setState({
        gamingVideos: updatedVideos,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={50} width={50} />
    </div>
  )

  renderFailureView = isDarkTheme => (
    <div className="faillure-container">
      <img
        src={
          isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        }
        alt="failure view"
        className="failure-img"
      />
      <h1 className={isDarkTheme ? 'dark-failure-head' : 'light-failure-head'}>
        Oops! Something Went Wrong
      </h1>
      <p className="failure-paragraph">
        We are having some trouble to complete your request. Please try again.
      </p>
      <button className="Retry-btn" onClick={this.getGamingVideos}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = isDarkTheme => {
    const {gamingVideos} = this.state
    return (
      <ul className="gaming-videos-list">
        {gamingVideos.map(video => (
          <Link
            to={`/videos/${video.id}`}
            className="gaming-link-item"
            key={video.id}
          >
            <li className="gaming-video-card">
              <img
                src={video.thumbnailUrl}
                alt="video thumbnail"
                className="gaming-thumbnail"
              />
              <p className={isDarkTheme ? 'dark-title' : 'light-title'}>
                {video.title}
              </p>
              <p className="gaming-views">
                {video.viewCount} Watching Worldwide
              </p>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  renderContent = isDarkTheme => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderSuccessView(isDarkTheme)
      case apiStatusConstants.failure:
        return this.renderFailureView(isDarkTheme)
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const mainBg = isDarkTheme
            ? 'home-content-dark'
            : 'home-content-light'

          return (
            <>
              <Header />
              <div className="home-main-container">
                <Sidebar />
                <div className={mainBg} data-testid="gaming">
                  <div className="gaming-banner">
                    <SiYoutubegaming className="gaming-icon" />
                    <h1
                      className={
                        isDarkTheme
                          ? 'trend-heading-light'
                          : 'trend-heading-dark'
                      }
                    >
                      Gaming
                    </h1>
                  </div>
                  {this.renderContent(isDarkTheme)}
                </div>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Gaming
