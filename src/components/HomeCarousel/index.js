import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

import './index.css'

class HomeCarousel extends Component {
  state = {isLoading: false, carouselImages: []}

  componentDidMount() {
    this.getCarouselImages()
  }

  getCarouselImages = async () => {
    this.setState({isLoading: true})
    const offerUrl = 'https://apis.ccbp.in/restaurants-list/offers'

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(offerUrl, options)
    const data = await response.json()
    // console.log(data)
    const formattedData = data.offers.map(eachItem => ({
      id: eachItem.id,
      imageUrl: eachItem.image_url,
    }))
    this.setState({carouselImages: formattedData, isLoading: false})
  }

  // testid="restaurants-offers-loader"

  displayLoaderView = () => (
    <div className="offers-images-loader" testid="restaurants-offers-loader">
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  displayCarousel = () => {
    const {carouselImages} = this.state

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    }

    return (
      <ul className="carousel-images">
        <Slider {...settings} className="carousel-container">
          {carouselImages.map(eachImage => (
            <li key={eachImage.id}>
              <img
                src={eachImage.imageUrl}
                alt="offer"
                className="each-carousal-image"
              />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  //  return isLoading ? this.displayLoaderView() : this.displayCarousel()

  render() {
    const {isLoading} = this.state

    return isLoading ? this.displayLoaderView() : this.displayCarousel()
  }
}

export default HomeCarousel
