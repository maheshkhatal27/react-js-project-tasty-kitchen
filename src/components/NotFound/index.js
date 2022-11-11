import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dodmtflaq/image/upload/v1668174167/PROJECT-TASTY-KITCHEN/erroring_1_uufzkb.png"
      className="error-img"
      alt="not found"
    />
    <h1 className="not-found-text">Page Not Found</h1>
    <p className="not-found-desc">
      we are sorry, the page you requested could not be found <br /> Please go
      back to the homepage
    </p>
    <Link to="/">
      <button type="button" className="not-found-home-btn">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
