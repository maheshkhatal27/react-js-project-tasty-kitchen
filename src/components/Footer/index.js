import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import {Component} from 'react'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-section">
      <div className="logo-name-container">
        <img
          src="https://res.cloudinary.com/dodmtflaq/image/upload/v1668068913/PROJECT-TASTY-KITCHEN/Vector_qi1krn.png"
          alt="website-footer-logo"
          className="logo-img"
        />
        <h1 className="footer-name">Tasty Kitchens</h1>
      </div>
      <p className="info">
        The only thing we are serious about is food.
        <br />
        Contact us on
      </p>
      <div className="social-icons-container">
        <FaPinterestSquare
          testid="pintrest-social-icon"
          className="social-icon"
        />
        <FaInstagram testid="instagram-social-icon" className="social-icon" />
        <FaTwitter testid="twitter-social-icon" className="social-icon" />
        <FaFacebookSquare
          testid="facebook-social-icon"
          className="social-icon"
        />
      </div>
    </div>
  )
}
