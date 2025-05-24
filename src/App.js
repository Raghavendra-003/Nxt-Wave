import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './pages/Login'
import Home from './pages/Home'
import Trending from './pages/Trending'
import Gaming from './pages/Gaming'
import VideoItemDetails from './pages/VideoItemDetails'
import SavedVideos from './pages/SavedVideos'
import NotFound from './pages/NotFound'
import ThemeContext from './context/ThemeContext'
import SaveContext from './context/SaveContext'
import ProtectedRoute from './pages/ProtectedRoute'

class App extends Component {
  state = {
    isDarkTheme: false,
    savedVideos: [],
  }

  toggleSaveVideo = video => {
    this.setState(prev => {
      const isAlreadySave = prev.savedVideos.some(item => item.id === video.id)
      const updatedList = isAlreadySave
        ? prev.savedVideos.filter(item => item.id !== video.id)
        : [...prev.savedVideos, video]
      return {savedVideos: updatedList}
    })
  }

  toggleTheme = () => {
    this.setState(prev => ({isDarkTheme: !prev.isDarkTheme}))
  }

  render() {
    const {isDarkTheme, savedVideos} = this.state
    return (
      <SaveContext.Provider
        value={{savedVideos, toggleSaveVideo: this.toggleSaveVideo}}
      >
        <ThemeContext.Provider
          value={{
            isDarkTheme,
            toggleTheme: this.toggleTheme,
          }}
        >
          <>
            <Switch>
              <Route exact path="/login" component={Login} />
              <ProtectedRoute exact path="/" component={Home} />
              <ProtectedRoute exact path="/trending" component={Trending} />
              <ProtectedRoute exact path="/gaming" component={Gaming} />
              <ProtectedRoute
                exact
                path="/videos/:id"
                component={VideoItemDetails}
              />
              <ProtectedRoute
                exact
                path="/saved-videos"
                component={SavedVideos}
              />
              <Route path="/not-found" component={NotFound} />
              <Redirect to="/not-found" />
            </Switch>
          </>
        </ThemeContext.Provider>
      </SaveContext.Provider>
    )
  }
}

export default App
