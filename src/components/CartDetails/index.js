import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaCheckCircle} from 'react-icons/fa'
import {BiRupee} from 'react-icons/bi'
import Navbar from '../Navbar'
import Footer from '../Footer'
import CartItem from '../CartItem'
import './index.css'

const cartStatusConstants = {
  initial: 'INITIAL',
  cartItemsFound: 'SUCCESS',
  noCartItems: 'FAILURE',
  paymentSuccess: 'PAYMENT',
}

const cartEmptyUrl =
  'https://res.cloudinary.com/dodmtflaq/image/upload/v1668143303/PROJECT-TASTY-KITCHEN/cart-no-order_qivsro_tndzd4.png'

class CartDetails extends Component {
  state = {cartData: [], cartStatus: cartStatusConstants.initial}

  componentDidMount() {
    this.getTheCartData()
  }

  // get the cart data

  getTheCartData = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    console.log(cartData)
    if (cartData.length === 0) {
      // console.log(cartData.length)
      this.setState({
        cartStatus: cartStatusConstants.noCartItems,
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
        cartStatus: cartStatusConstants.cartItemsFound,
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
    this.getTheCartData()
  }

  // decrement the cart quantity

  decrementCartItemQuantity = id => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === id) {
        if (eachItem.quantity > 0) {
          console.log(eachItem.quantity)
          const updatedQuantity = eachItem.quantity - 1
          console.log('updated:>>', updatedQuantity)
          return {...eachItem, quantity: updatedQuantity}
        }
      }
      return eachItem
    })
    console.log('updatedCartData :>> ', updatedCartData)
    // localStorage.setItem('cart_data', JSON.stringify(updatedCartData))
    // this.getTheCartData()
    this.removeCartItem(updatedCartData)
  }

  // remove the item

  removeCartItem = updatedData => {
    // const cartData = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = updatedData.filter(
      eachCartItem => eachCartItem.quantity > 0,
    )
    console.log(updatedCartData)
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getTheCartData()
  }

  // calculate the total amount

  calculateTheTotalAmount = () => {
    const {cartData} = this.state
    // console.log(cartData)
    const amountList = cartData.map(each => each.quantity * each.cost)
    // console.log(amountList)
    const totalAmount = amountList.reduce((a, b) => a + b)
    return totalAmount
  }

  placeOrder = () => {
    this.setState({cartStatus: cartStatusConstants.paymentSuccess})
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

  cartEmptyView = () => (
    <div className="cart-empty-view-container">
      <img src={cartEmptyUrl} alt="empty cart" className="cart-img" />
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

  cartItemsView = () => {
    const {cartData} = this.state
    // const cartData = JSON.parse(localStorage.getItem('cartData'))
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
                <p
                  // testid="total-price"
                  className="total-amount"
                >
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
      case cartStatusConstants.cartItemsFound:
        return this.cartItemsView()
      case cartStatusConstants.noCartItems:
        return this.cartEmptyView()
      case cartStatusConstants.paymentSuccess:
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
