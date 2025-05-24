import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import VideoCard from '../../components/VideoCard'
import PremiumBanner from '../PremiumBanner'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    isShowedBanner: true,
    videoList: [],
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(video => ({
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
        videoList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
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
        width={200}
      />
      <h1 className={isDarkTheme ? 'dark-failure-head' : 'light-failure-head'}>
        Oops! Something Went Wrong
      </h1>
      <p className="failure-paragraph">
        We are having some trouble to complete your request.
      </p>
      <p className="failure-paragraph">Please try again.</p>
      <button type="button" className="Retry-btn" onClick={this.getVideos}>
        Retry
      </button>
    </div>
  )

  renderNoSearchResult = isDarkTheme => (
    <div className="noSearch-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
        width={200}
      />
      <h1 className={isDarkTheme ? 'light-failure-head' : 'dark-failure-head'}>
        No Search Results Found
      </h1>
      <p className="failure-paragraph">
        Try different key words or remove search filter
      </p>
      <button type="button" className="Retry-btn" onClick={this.getVideos}>
        Retry
      </button>
    </div>
  )

  renderVideoList = isDarkTheme => {
    const {videoList} = this.state
    if (videoList.length === 0) {
      return this.renderNoSearchResult(isDarkTheme)
    }
    return (
      <ul className="videos-list-container">
        {videoList.map(video => (
          <VideoCard key={video.id} videoDetails={video} />
        ))}
      </ul>
    )
  }

  renderHomeDetails = isDarkTheme => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderVideoList(isDarkTheme)
      case apiStatusConstants.failure:
        return this.renderFailureView(isDarkTheme)
      default:
        return null
    }
  }

  handleCloseButton = () => {
    this.setState({isShowedBanner: false})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getVideos()
  }

  render() {
    const {isShowedBanner, searchInput} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <>
              <Header />
              <div className="home-main-container">
                <Sidebar />
                <div
                  className={
                    isDarkTheme ? 'home-content-dark' : 'home-content-light'
                  }
                  data-testid="home"
                >
                  {isShowedBanner && (
                    <PremiumBanner
                      data-testid="banner"
                      onClickCloseBtn={this.handleCloseButton}
                    />
                  )}
                  <div className="search-bar-container">
                    <input
                      type="search"
                      className="search-input"
                      placeholder="Search"
                      value={searchInput}
                      onChange={this.onChangeSearchInput}
                    />
                    <button
                      className="search-icon-btn"
                      type="button"
                      data-testid="searchButton"
                      onClick={this.onClickSearch}
                    >
                      <BsSearch size={16} />
                    </button>
                  </div>
                  {this.renderHomeDetails(isDarkTheme)}
                </div>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
