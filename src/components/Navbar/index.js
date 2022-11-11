import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoIosCloseCircle} from 'react-icons/io'

import Popup from 'reactjs-popup'

import './index.css'

const Navbar = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  // using browser property...to get the current page.
  const getColor = current => {
    const {history} = props
    if (history.location.pathname === current) {
      return '#f7931e'
    }
    return '#334155'
  }

  return (
    <nav className="navbar-container">
      <div className="logo-name-container">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dodmtflaq/image/upload/v1667883344/PROJECT-TASTY-KITCHEN/Frame_274logo-desktop_w0kkgl.jpg"
            alt="website logo"
            className="logo-img"
          />
        </Link>
        <h1 className="logo-name">Tasty Kitchens</h1>
      </div>
      <ul className="nav-menu-list">
        <Link to="/" className="link-item">
          <li className="nav-menu" style={{color: getColor('/')}}>
            Home
          </li>
        </Link>
        <Link to="/cart" className="link-item">
          <li className="nav-menu" style={{color: getColor('/cart')}}>
            Cart
          </li>
        </Link>
        <Link to="cart" className="link-item">
          <li>
            <button
              type="button"
              className="logout-button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
        </Link>
      </ul>
      <Popup
        trigger={
          <button type="button" className="hamburger-button">
            <GiHamburgerMenu size={45} className="hamburger" />
          </button>
        }
      >
        {close => (
          <div className="popup-container">
            <div className="nav-link-container">
              <Link to="/" className="nav-link">
                <p className="nav-menu-item">Home</p>
              </Link>
              <Link to="/cart" className="nav-link">
                <p className="nav-menu-item">Cart</p>
              </Link>
              <button
                type="button"
                className="logout-desktop-btn"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </div>
            <button type="button" className="close-btn">
              <IoIosCloseCircle size={40} onClick={() => close()} />
            </button>
          </div>
        )}
      </Popup>
    </nav>
  )
}

export default withRouter(Navbar)
