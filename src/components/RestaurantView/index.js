import {Link} from 'react-router-dom'
import {ImStarFull} from 'react-icons/im'

import './index.css'

const RestaurantCard = props => {
  const {restaurantDetails} = props
  const {id, cuisine, imageUrl, name, rating, totalReviews} = restaurantDetails

  return (
    <Link to={`/restaurant/${id}`} className="link">
      <li testid="restaurant-item" className="restaurant-container">
        <img src={imageUrl} alt="restaurant" className="img-rest" />
        <div className="restaurant-details-container">
          <h1 className="name">{name}</h1>
          <p className="cuisine">{cuisine}</p>
          <div className="star-rating">
            <ImStarFull className="star" />
            <p className="rating">{rating}</p>
            <p className="total-reviews">({totalReviews} rating)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantCard