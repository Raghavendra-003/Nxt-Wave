import {Link} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const VideoCard = ({videoDetails}) => {
  const {
    id,
    title,
    thumbnailUrl,
    channel,
    viewCount,
    publishedAt,
  } = videoDetails
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <Link to={`/videos/${id}`} className="video-card-link">
            <li
              className={isDarkTheme ? 'video-card-dark' : 'video-card-light'}
            >
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="video-card-img"
              />
              <div className="video-info">
                <img
                  src={channel.profileImageUrl}
                  alt="channel logo"
                  className="channel-logo"
                />
                <div className="video-card-text">
                  <p className={isDarkTheme ? 'dark-title' : 'light-title'}>
                    {title}
                  </p>
                  <p className="video-name">{channel.name}</p>
                  <p className="views-published">
                    {viewCount} views . {publishedAt}
                  </p>
                </div>
              </div>
            </li>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default VideoCard
