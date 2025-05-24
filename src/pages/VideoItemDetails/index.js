import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import ThemeContext from '../../context/ThemeContext'
import SaveContext from '../../context/SaveContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {
    videoData: {},
    likeActive: false,
    dislikeActive: false,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        id: data.video_details.id,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        thumbnailUrl: data.video_details.thumbnail_url,
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
        viewCount: data.video_details.view_count,
        publishedAt: data.video_details.published_at,
        description: data.video_details.description,
      }

      this.setState({
        videoData: updatedData,
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
      <button
        type="button"
        className="Retry-btn"
        onClick={this.getVideoDetails}
      >
        Retry
      </button>
    </div>
  )

  onClickLike = () => {
    this.setState(prevState => ({
      likeActive: !prevState.likeActive,
      dislikeActive: false,
    }))
  }

  onClickDislike = () => {
    this.setState(prevState => ({
      dislikeActive: !prevState.dislikeActive,
      likeActive: false,
    }))
  }

  renderVideoDetails = isDarkTheme => {
    const {videoData, likeActive, dislikeActive} = this.state
    const {
      title,
      channel,
      videoUrl,
      viewCount,
      publishedAt,
      description,
    } = videoData

    return (
      <SaveContext.Consumer>
        {({savedVideos, toggleSaveVideo}) => {
          const isSaved = savedVideos.some(video => video.id === videoData.id)

          const onClickSaveBtn = () => {
            toggleSaveVideo(videoData)
          }

          return (
            <div
              className={
                isDarkTheme
                  ? 'video-details-dark-container'
                  : 'video-details-light-container'
              }
              data-testid="videoItemDetails"
            >
              <ReactPlayer
                url={videoUrl}
                className="react-player"
                width="100%"
                height="360px"
                controls
              />
              <p className={isDarkTheme ? 'dark-title' : 'light-title'}>
                {title}
              </p>
              <div className="views-likes-save">
                <p className={isDarkTheme ? 'light-views' : 'dark-views'}>
                  {viewCount} views . {publishedAt}
                </p>
                <div className="likes-saves">
                  <button
                    type="button"
                    className={`${
                      isDarkTheme ? 'light-buttons' : 'dark-buttons'
                    } ${likeActive ? 'active-button' : 'in-active-button'}`}
                    onClick={this.onClickLike}
                  >
                    <BiLike /> Like
                  </button>

                  <button
                    type="button"
                    className={`${
                      isDarkTheme ? 'light-buttons' : 'dark-buttons'
                    } ${dislikeActive ? 'active-button' : 'in-active-button'}`}
                    onClick={this.onClickDislike}
                  >
                    <BiDislike /> Dislike
                  </button>

                  <button
                    type="button"
                    className={`${
                      isDarkTheme ? 'light-buttons' : 'dark-buttons'
                    } ${isSaved ? 'active-button' : 'in-active-button'}`}
                    onClick={onClickSaveBtn}
                  >
                    <MdPlaylistAdd /> {isSaved ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>

              {channel && (
                <div className="channel-info">
                  <img
                    src={channel.profileImageUrl}
                    alt="channel logo"
                    className="channel-logo"
                  />
                  <div className="channel-info-text">
                    <p
                      className={
                        isDarkTheme ? 'light-description' : 'dark-description'
                      }
                    >
                      {channel.name}
                    </p>
                    <p
                      className={
                        isDarkTheme ? 'light-subscribe' : 'dark-subscribe'
                      }
                    >
                      {channel.subscriberCount} subscribers
                    </p>
                    <p
                      className={
                        isDarkTheme ? 'light-description' : 'dark-description'
                      }
                    >
                      {description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )
        }}
      </SaveContext.Consumer>
    )
  }

  renderVideoContent = isDarkTheme => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderVideoDetails(isDarkTheme)
      case apiStatusConstants.failure:
        return this.renderFailureView(isDarkTheme)
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {({isDarkTheme}) => (
          <>
            <Header />
            <div className="video-details-main-container">
              <Sidebar />
              {this.renderVideoContent(isDarkTheme)}
            </div>
          </>
        )}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoItemDetails
