import {Component} from 'react'
import {ImStarFull} from 'react-icons/im'
import {FaRupeeSign} from 'react-icons/fa'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import './index.css'

class FoodItem extends Component {
  state = {
    isFound: false,
    quantity: 0,
  }

  componentDidMount() {
    this.getItemsInTheCart()
  }

  getItemsInTheCart = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const {foodItemDetails} = this.props
    const cartItem = cartData.filter(each => each.id === foodItemDetails.id)

    // console.log(cartItem)
    if (cartItem.length !== 0) {
      // console.log(cartItem)
      if (cartItem[0].quantity > 0) {
        this.setState({quantity: cartItem[0].quantity, isFound: true})
      } else if (cartItem[0].quantity < 1) {
        this.removeCartItem()
        this.setState({quantity: cartItem[0].quantity, isFound: false})
      }
    }
  }

  removeCartItem = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {foodItemDetails} = this.props
    const updatedCartData = cartData.filter(
      eachCartItem => eachCartItem.id !== foodItemDetails.id,
    )
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getItemsInTheCart()
  }

  onClickAddData = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []

    const {foodItemDetails} = this.props
    const cartItem = {...foodItemDetails, quantity: 1}
    // console.log(cartItem)
    cartData.push(cartItem)
    localStorage.setItem('cartData', JSON.stringify(cartData))
    this.getItemsInTheCart()
    this.setState({isFound: true})
  }

  increaseCartCount = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {foodItemDetails} = this.props
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === foodItemDetails.id) {
        // console.log('found')
        const updatedQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getItemsInTheCart()
  }

  decreaseCartCount = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {foodItemDetails} = this.props
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === foodItemDetails.id) {
        // console.log('found')
        if (eachItem.quantity > 0) {
          const updatedQuantity = eachItem.quantity - 1
          return {...eachItem, quantity: updatedQuantity}
        }
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getItemsInTheCart()
  }

  render() {
    const {foodItemDetails} = this.props
    const {cost, imageUrl, name, rating} = foodItemDetails

    const {isFound, quantity} = this.state
    return (
      <li className="each-food-item" testid="foodItem">
        <img src={imageUrl} alt="food item" className="food-img" />
        <div className="food-details">
          <h1 className="food-menu-heading">{name}</h1>
          <div className="rupee-container">
            <FaRupeeSign size={16} color="#334155" />
            <p className="cost">{cost}</p>
          </div>
          <div className="rating-container">
            <ImStarFull size={16} color="#FFCC00" />
            <p className="rating">{rating}</p>
          </div>
          {isFound ? (
            <div className="food-item-counter-container">
              <button
                type="button"
                className="icon-button-sqr"
                testid="decrement-count"
                onClick={this.decreaseCartCount}
              >
                <BsDashSquare className="minus-icon" />
              </button>
              <p className="count-item" testid="active-count">
                {quantity}
              </p>
              <button
                type="button"
                className="icon-button-sqr"
                testid="increment-count"
                onClick={this.increaseCartCount}
              >
                <BsPlusSquare className="plus-icon" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="food-btn"
              onClick={this.onClickAddData}
            >
              ADD
            </button>
          )}
        </div>
      </li>
    )
  }
}

export default FoodItem
