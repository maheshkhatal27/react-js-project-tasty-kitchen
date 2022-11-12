import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorFlag: false,
    errorMsg: '',
  }

  onSubmitSuceess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      errorFlag: true,
      errorMsg: 'Please enter a valid Username & Password',
    })
  }

  onSubmitLoginDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginUrl, options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      this.onSubmitSuceess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  setUserName = event => {
    this.setState({username: event.target.value})
  }

  setPassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorFlag, errorMsg} = this.state

    // If user is already logged in then get the details through cookies and redirect to / path

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="main-login-container">
        <div className="login-bg-container">
          <img
            src="https://res.cloudinary.com/dodmtflaq/image/upload/v1667883344/PROJECT-TASTY-KITCHEN/Rectangle_1457login-mb-pg_gp6gx2.jpg"
            alt="website logo"
            className="login-img"
          />
          <div className="bg-lg-container">
            <div className="login-bg-big-size-container">
              <div className="logo-name-container">
                <img
                  src="https://res.cloudinary.com/dodmtflaq/image/upload/v1667883344/PROJECT-TASTY-KITCHEN/Frame_274logo-desktop_w0kkgl.jpg"
                  alt="website logo"
                  className="logo-img"
                />
                <h1 className="logo-name">Tasty Kitchens</h1>
              </div>
              <h1 className="heading-lg">Login</h1>
            </div>

            <form
              className="form-container"
              onSubmit={this.onSubmitLoginDetails}
            >
              <h1 className="heading-sm">Login</h1>
              <label className="label" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                placeholder="username"
                value={username}
                id="username"
                className="input-field"
                onChange={this.setUserName}
              />
              <label className="label" htmlFor="pwd">
                PASSWORD
              </label>
              <input
                type="password"
                placeholder="password"
                value={password}
                id="pwd"
                className="input-field"
                onChange={this.setPassword}
              />

              {errorFlag ? <p className="error-msg">{errorMsg}</p> : ''}

              <button type="submit" className="button">
                Login
              </button>
            </form>
          </div>
        </div>

        <img
          src="https://res.cloudinary.com/dodmtflaq/image/upload/v1667883346/PROJECT-TASTY-KITCHEN/Rectangle_1456login-pg-dsk_zuvspn.jpg"
          alt="website login"
          className="big-img"
        />
      </div>
    )
  }
}

export default Login
