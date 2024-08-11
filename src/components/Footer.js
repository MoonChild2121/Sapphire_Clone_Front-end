// Footer.js
import React from 'react';
import './Footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import PaymentImage from '../images/paypal.avif'; 

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-column">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <div className="contact-item">
              <LocationOnOutlinedIcon className="icon" />
              <span>Sapphire Retail Head Office<br/>1.5-Km, Defence Road, Bhobtian Chowk, Off Raiwind Road, Opposite University of Lahore, Lahore.</span>
            </div>
            <div className="contact-item">
              <EmailOutlinedIcon className="icon" />
              <span>wecare@sapphireonline.pk</span>
            </div>
            <div className="contact-item">
              <CallOutlinedIcon className="icon" />
              <span>+92(0)42 111-738-245</span>
            </div>
          </div>
        </div>
        <div className="footer-column">
          <h3>Customer Care</h3>
          <ul>
            <li>Exchange & Return Policy</li>
            <li>FAQs</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Information</h3>
          <ul>
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>SafePay Guide</li>
            <li>Payments</li>
            <li>Store Locator</li>
            <li>Fabric Glossary</li>
            <li>Blogs</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Newsletter Signup</h3>
          <div className="newsletter-signup">
            <input type="email" placeholder="your email address" />
            <button type="button">Subscribe</button>
          </div>
          <div className="social-icons">
            <FacebookIcon className="social-icon" />
            <InstagramIcon className="social-icon" />
            <YouTubeIcon className="social-icon" />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-text">
          © COPYRIGHT 2024 SAPPHIRE
        </div>
        <div className="payment-image">
          <img src={PaymentImage} alt="Payment Methods" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
