import {Component} from 'react'
import {FaFire} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'
import SaveContext from '../../context/SaveContext'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import './index.css'

class SavedVideos extends Component {
  renderNoSavedVideos = isDarkTheme => (
    <div className="no-saved-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
        className="no-saved-img"
      />
      <h1 className={isDarkTheme ? 'dark-title' : 'light-title'}>
        No saved videos found
      </h1>
      <p className="no-saved-description">
        You can save your videos while watching them
      </p>
    </div>
  )

  renderSavedVideosList = (savedVideos, isDarkTheme) => (
    <ul className="saved-videos-list">
      {savedVideos.map(video => (
        <Link
          to={`/videos/${video.id}`}
          className="saved-video-link"
          key={video.id}
        >
          <li className="saved-video-item">
            <img
              src={video.thumbnailUrl}
              alt="video thumbnail"
              className="saved-thumbnail"
            />
            <div className="saved-video-details">
              <p className={isDarkTheme ? 'dark-title' : 'light-title'}>
                {video.title}
              </p>
              <p className="saved-channel">{video.channel.name}</p>
              <p className="saved-channel">
                {video.viewCount} views • {video.publishedAt}
              </p>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  )

  render() {
    return (
      <ThemeContext.Consumer>
        {({isDarkTheme}) => (
          <SaveContext.Consumer>
            {({savedVideos}) => (
              <>
                <Header />
                <div className="saved-main-container">
                  <Sidebar />
                  <div
                    className={
                      isDarkTheme ? 'saved-content-dark' : 'saved-content-light'
                    }
                    data-testid="savedVideos"
                  >
                    <div className="saved-heading-container">
                      <FaFire className="saved-icon" />
                      <h1 className="saved-heading">Saved Videos</h1>
                    </div>
                    {savedVideos.length === 0
                      ? this.renderNoSavedVideos(isDarkTheme)
                      : this.renderSavedVideosList(savedVideos, isDarkTheme)}
                  </div>
                </div>
              </>
            )}
          </SaveContext.Consumer>
        )}
      </ThemeContext.Consumer>
    )
  }
}

export default SavedVideos
