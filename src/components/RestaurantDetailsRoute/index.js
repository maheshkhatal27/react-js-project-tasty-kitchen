import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar, FaRupeeSign} from 'react-icons/fa'
import Navbar from '../Navbar'
import Footer from '../Footer'
import FoodItem from '../FoodItem'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetailsRoute extends Component {
  state = {
    apiStatus: apiConstants.initial,
    isLoading: false,
    restaurantData: [],
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  convertFoodItemData = eachFoodItem => {
    const foodItem = {
      cost: eachFoodItem.cost,
      foodType: eachFoodItem.food_type,
      id: eachFoodItem.id,
      imageUrl: eachFoodItem.image_url,
      name: eachFoodItem.name,
      rating: eachFoodItem.rating,
    }

    return foodItem
  }

  convertToFormatData = data => {
    const formatData = {
      costForTwo: data.cost_for_two,
      cuisine: data.cuisine,
      foodItems: data.food_items.map(eachItem =>
        this.convertFoodItemData(eachItem),
      ),
      restaurantId: data.id,
      imageUrl: data.image_url,
      itemCount: data.items_count,
      location: data.location,
      name: data.name,
      opensAt: data.opens_at,
      rating: data.rating,
      reviewsCount: data.reviews_count,
    }
    return formatData
  }

  getRestaurantDetails = async () => {
    this.setState({apiStatus: apiConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      const formattedData = this.convertToFormatData(data)
      // console.log(formattedData)
      this.setState({
        apiStatus: apiConstants.success,
        restaurantData: formattedData,
        isLoading: true,
      })
    }
  }

  renderRestaurants = () => {
    const {restaurantData} = this.state
    const {foodItems} = restaurantData

    const {
      costForTwo,
      name,
      cuisine,
      imageUrl,
      location,
      rating,
      reviewsCount,
    } = restaurantData
    return (
      <div className="rest-main-container">
        <div className="restaurant-banner-container">
          <img src={imageUrl} alt="restaurant" className="top-img" />
          <div className="details-container">
            <h1 className="rest-place-name">{name}</h1>
            <p className="info-text">{cuisine}</p>
            <p className="info-text">{location}</p>
            <div className="items-container">
              <div className="rating-container">
                <p className="sign">
                  <FaStar />
                  {rating}
                </p>
                <p className="sub-text">{reviewsCount}+ Ratings</p>
              </div>
              <hr className="vertical-line" />
              <div className="pricing-container">
                <p className="sign">
                  <FaRupeeSign />
                  {costForTwo}
                </p>
                <p className="sub-text">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-items-container">
          {foodItems.map(eachFoodItem => (
            <FoodItem key={eachFoodItem.id} foodItemDetails={eachFoodItem} />
          ))}
        </ul>
      </div>
    )
  }

  //  testid="restaurant-details-loader"
  displayLoader = () => (
    <div className="item-loader" testid="restaurant-details-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  displayRestDetailsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.renderRestaurants()
      case apiConstants.inProgress:
        return this.displayLoader()
      case apiConstants.failure:
        return null
      default:
        return null
    }
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Navbar />
        {this.displayRestDetailsView()}

        {isLoading && <Footer />}
      </>
    )
  }
}

export default RestaurantDetailsRoute
