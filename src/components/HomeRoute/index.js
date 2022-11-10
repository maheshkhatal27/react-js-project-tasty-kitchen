import Navbar from '../Navbar'
import HomeCarousel from '../HomeCarousel'
import Restaurants from '../Restaurants'
import Footer from '../Footer'
import './index.css'

const HomeRoute = () => (
  <>
    <Navbar />
    <div className="home-container">
      <HomeCarousel />
      <Restaurants />
    </div>
    <Footer />
  </>
)

export default HomeRoute
