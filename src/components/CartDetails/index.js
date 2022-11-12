import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaCheckCircle} from 'react-icons/fa'
import {BiRupee} from 'react-icons/bi'
import Navbar from '../Navbar'
import Footer from '../Footer'
import CartItem from '../CartItem'
import './index.css'

const statusConstants = {
  initial: 'INITIAL',
  noCartItems: 'FAILURE',
  cartItemsFound: 'SUCCESS',
  paymentSuccess: 'PAYMENT',
}

class CartDetails extends Component {
  state = {cartData: [], cartStatus: statusConstants.initial}

  componentDidMount() {
    this.getCartData()
  }

  // get the cart data

  getCartData = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    console.log(cartData)
    if (cartData.length === 0) {
      // console.log(cartData.length)
      this.setState({
        cartStatus: statusConstants.noCartItems,
      })
    } else {
      const cartItems = cartData.map(each => ({
        cost: each.cost,
        quantity: each.quantity,
        id: each.id,
        imageUrl: each.imageUrl,
        name: each.name,
      }))
      // console.log(cartItems)
      this.setState({
        cartStatus: statusConstants.cartItemsFound,
        cartData: cartItems,
      })
    }
  }

  incrementCartItemQuantity = id => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === id) {
        console.log(eachItem.quantity)
        const updatedQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getCartData()
  }

  // decrement the cart quantity

  decrementCartItemQuantity = id => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === id) {
        if (eachItem.quantity > 0) {
          const updatedQuantity = eachItem.quantity - 1

          return {...eachItem, quantity: updatedQuantity}
        }
      }
      return eachItem
    })
    this.removeCartItem(updatedCartData)
  }

  removeCartItem = updatedData => {
    const updatedCartData = updatedData.filter(
      eachCartItem => eachCartItem.quantity > 0,
    )
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getCartData()
  }

  // calculate the total amount

  calculateTheTotalAmount = () => {
    const {cartData} = this.state

    const amountList = cartData.map(each => each.quantity * each.cost)
    // using reduce function to calculae the total...
    const totalAmount = amountList.reduce((a, b) => a + b)
    return totalAmount
  }

  placeOrder = () => {
    this.setState({cartStatus: statusConstants.paymentSuccess})
    localStorage.clear('cartData')
  }

  paymentSuccessfulView = () => (
    <div className="cart-success-container">
      <FaCheckCircle className="circle-icon" />
      <h1 className="success-heading">Payment Successful</h1>
      <p className="success-desc">
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link to="/" style={{textDecoration: 'none'}}>
        <button type="button" className="home-button">
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  noCartEmptyView = () => (
    <div className="cart-empty-view-container">
      <img
        src="https://res.cloudinary.com/dodmtflaq/image/upload/v1668143303/PROJECT-TASTY-KITCHEN/cart-no-order_qivsro_tndzd4.png"
        alt="empty cart"
        className="cart-img"
      />
      <h1 className="empty-heading">No Order Yet!</h1>
      <p className="cart-empty-desc">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/" style={{textDecoration: 'none'}}>
        <button type="button" className="order-now-button">
          Order Now
        </button>
      </Link>
    </div>
  )

  presentCartItemsView = () => {
    const {cartData} = this.state

    console.log(cartData)
    const totalAmount = this.calculateTheTotalAmount()
    return (
      <>
        <div className="cart-container">
          <div className="cart-items-container">
            <div className="d-heading-container">
              <h1 className="items-heading-1">Item</h1>
              <h1 className="items-heading">Quantity</h1>
              <h1 className="items-heading">Price</h1>
            </div>
            <ul className="cart-list-items-container">
              {cartData.map(eachItem => (
                <CartItem
                  key={eachItem.id}
                  eachCartItem={eachItem}
                  incrementQuantity={this.incrementCartItemQuantity}
                  decrementQuantity={this.decrementCartItemQuantity}
                />
              ))}
            </ul>
            <hr className="horizontal-line" />
            <div className="total-container">
              <h1 className="heading-order">Order Total:</h1>
              <div className="total-amt-container">
                <BiRupee className="total-rupee" />
                <p testid="total-price" className="total-amount">
                  {totalAmount}.00
                </p>
              </div>
            </div>
            <button
              type="button"
              className="order-button"
              onClick={this.placeOrder}
            >
              Place Order
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  displayCartPage = () => {
    const {cartStatus} = this.state

    switch (cartStatus) {
      case statusConstants.cartItemsFound:
        return this.presentCartItemsView()
      case statusConstants.noCartItems:
        return this.noCartEmptyView()
      case statusConstants.paymentSuccess:
        return this.paymentSuccessfulView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="cart-bg-container">{this.displayCartPage()}</div>
      </>
    )
  }
}

export default CartDetails
