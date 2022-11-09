import {Component} from 'react'
import './index.css'

class Restaurants extends Component {
  render() {
    return (
      <div className="restaurant-content-container">
        <h1 className="heading">Popular Restaurants</h1>
        <p className="desc">
          Select your favourite restaurant special dish and make your day
          happy..
        </p>
        <hr />
      </div>
    )
  }
}

export default Restaurants
