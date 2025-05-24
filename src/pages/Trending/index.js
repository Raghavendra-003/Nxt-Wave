import {Component} from 'react'
import {HiFire} from 'react-icons/hi'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import ThemeContext from '../../context/ThemeContext'
import VideoCard from '../../components/VideoCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Trending extends Component {
  state = {
    trendingList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedList = data.videos.map(video => ({
        id: video.id,
        title: video.title,
        thumbnailUrl: video.thumbnail_url,
        channel: {
          name: video.channel.name,
          profileImageUrl: video.channel.profile_image_url,
        },
        viewCount: video.view_count,
        publishedAt: video.published_at,
      }))
      this.setState({
        trendingList: updatedList,
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
      <button className="Retry-btn" onClick={this.getTrendingVideos}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = isDarkTheme => {
    const {trendingList} = this.state
    return (
      <ul className="trending-videos-list">
        {trendingList.map(video => (
          <Link
            to={`/videos/${video.id}`}
            className="trending-link-item"
            key={video.id}
          >
            <li className="trending-video-item">
              <img
                src={video.thumbnailUrl}
                alt="video thumbnail"
                className="trending-thumbnail"
              />
              <div className="trending-video-details">
                <p className={isDarkTheme ? 'dark-title' : 'light-title'}>
                  {video.title}
                </p>
                <p className="trending-channel">{video.channel.name}</p>
                <p className="trending-views">
                  {video.viewCount} views • {video.publishedAt}
                </p>
              </div>
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
                <div className={mainBg} data-testid="trending">
                  <div className="trending-banner">
                    <HiFire className="trending-icon" />
                    <h1
                      className={
                        isDarkTheme
                          ? 'trend-heading-light'
                          : 'trend-heading-dark'
                      }
                    >
                      Trending
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

export default Trending
