import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {RiArrowDropLeftLine, RiArrowDropRightLine} from 'react-icons/ri'

import RestaurantView from '../RestaurantView'
import RestaurantFilter from '../RestaurantFilter'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Restaurants extends Component {
  state = {
    restaurantsList: [],
    isLoading: false,
    activePage: 1,
    sortOption: sortByOptions[1].value,
    totalPages: 0,
    searchInput: '',
  }

  componentDidMount() {
    this.getRestaurantsList()
  }

  getRestaurantsList = async () => {
    this.setState({isLoading: true})
    const {activePage, sortOption, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const limit = 9
    const offset = (activePage - 1) * limit
    // const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${sortOption}`

    const url = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${limit}&sort_by_rating=${sortOption}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    const numberOfRestaurants = data.total
    const totalPages = Math.ceil(numberOfRestaurants / limit)
    const formattedData = data.restaurants.map(eachItem => ({
      id: eachItem.id,
      cuisine: eachItem.cuisine,
      imageUrl: eachItem.image_url,
      name: eachItem.name,
      rating: eachItem.user_rating.rating,
      totalReviews: eachItem.user_rating.total_reviews,
    }))
    this.setState({
      restaurantsList: formattedData,
      isLoading: false,
      totalPages,
      searchInput: '',
    })
  }

  updateOption = option => {
    this.setState({sortOption: option}, this.getRestaurantsList)
  }

  onClickDecrementPages = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
        }),
        this.getRestaurantsList,
      )
    }
  }

  onClickIncrementPages = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
        }),
        this.getRestaurantsList,
      )
    }
  }

  searchChange = event => {
    this.setState({searchInput: event.target.value})
  }

  searchKeyDown = event => {
    if (event.key === 'Enter') {
      this.getRestaurantsList()
    }
  }

  displayPopularRestaurants = () => {
    const {
      restaurantsList,
      sortOption,
      activePage,
      totalPages,
      searchInput,
    } = this.state

    return (
      <>
        <RestaurantFilter
          sortOption={sortOption}
          sortByOptions={sortByOptions}
          updateOption={this.updateOption}
        />
        <hr className="hr-line" />
        <input
          type="search"
          className="search-bar"
          value={searchInput}
          placeholder="Search for a Restaurant"
          onChange={this.searchChange}
          onKeyDown={this.searchKeyDown}
        />
        <ul className="restaurants-list-items">
          {restaurantsList.map(eachItem => (
            <RestaurantView key={eachItem.id} restaurantDetails={eachItem} />
          ))}
        </ul>
        <div className="pagination-details">
          <button
            type="button"
            className="pg-button"
            onClick={this.onClickDecrementPages}
            testid="pagination-left-button"
          >
            <RiArrowDropLeftLine size={20} />
          </button>
          <p className="page-count" testid="active-page-number">
            {activePage}
          </p>
          <span
            className="page-count"
            style={{marginLeft: '5px', marginRight: '5px'}}
          >
            of
          </span>
          <p className="page-count"> {totalPages}</p>
          <button
            type="button"
            className="pg-button"
            onClick={this.onClickIncrementPages}
            testid="pagination-right-button"
          >
            <RiArrowDropRightLine size={20} />
          </button>
        </div>
      </>
    )
  }

  //  testid="restaurants-list-loader"
  displayLoader = () => (
    <div className="carousel-loader" testid="restaurants-list-loader">
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return isLoading ? this.displayLoader() : this.displayPopularRestaurants()
  }
}

export default Restaurants
