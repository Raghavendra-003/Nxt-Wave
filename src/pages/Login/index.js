import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isShowError: false,
    errorMsg: '',
    isChecked: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isShowError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeChecked = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked,
    }))
  }

  render() {
    const {username, password, isShowError, errorMsg, isChecked} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const logoUrl = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          return (
            <div className="bg-container">
              <div className="card-container">
                <img
                  src={logoUrl}
                  width="100px"
                  alt="website logo"
                  className="logo-img"
                />
                <form className="submit-form" onSubmit={this.onSubmitForm}>
                  <label htmlFor="username" className="label-name">
                    USERNAME
                  </label>
                  <input
                    className="input-user"
                    type="text"
                    id="username"
                    value={username}
                    onChange={this.onChangeUsername}
                    placeholder="Username"
                  />

                  <label htmlFor="password" className="label-name">
                    PASSWORD
                  </label>
                  <input
                    className="input-user"
                    type={isChecked ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={this.onChangePassword}
                    placeholder="Password"
                  />
                  <div className="show-password-card">
                    <input
                      className="input-user"
                      type="checkbox"
                      id="showPassword"
                      checked={isChecked}
                      onChange={this.onChangeChecked}
                    />
                    <label htmlFor="showPassword" className="password-name">
                      Show Password
                    </label>
                  </div>
                  <button type="submit" className="login-button">
                    Login
                  </button>
                  {isShowError && <p className="error-msg">*{errorMsg}</p>}
                </form>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Login
