import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import './index.css'

class CartItem extends Component {
  increment = () => {
    const {eachCartItem, incrementQuantity} = this.props
    incrementQuantity(eachCartItem.id)
  }

  decrement = () => {
    const {eachCartItem, decrementQuantity} = this.props
    decrementQuantity(eachCartItem.id)
  }

  render() {
    const {eachCartItem} = this.props
    // console.log(eachCartItem)
    const price = eachCartItem.cost * eachCartItem.quantity
    console.log(price)
    return (
      <li>
        <div testid="cartItem" className="cart-list-item">
          <img
            src={eachCartItem.imageUrl}
            alt="cart-item"
            className="item-img"
          />
          <div className="cart-details-container">
            <h1 className="cart-item-name">{eachCartItem.name}</h1>
            <div className="item-price-container">
              <div className="each-item-counter-container">
                <button
                  testid="decrement-quantity"
                  type="button"
                  className="minus-icon-container"
                  onClick={this.decrement}
                >
                  <BsDashSquare className="minus-icon" />
                </button>
                <p testid="item-quantity" className="count-value">
                  {eachCartItem.quantity}
                </p>
                <button
                  testid="increment-quantity"
                  type="button"
                  className="plus-icon-container"
                  onClick={this.increment}
                >
                  <BsPlusSquare className="plus-icon" />
                </button>
              </div>
              <div className="item-rate-container">
                <BiRupee className="item-rupee" />
                <p className="item-cost">{eachCartItem.cost}</p>
              </div>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export default CartItem
