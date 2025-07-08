import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className='footer-content-left'>
                <Link to='/'><img src={assets.logo} alt='logo-of-app' className='logo'/></Link>
                <p>The sun dipped below the horizon, casting golden hues across the quiet lake. Birds chirped softly as the wind whispered through the trees. A small boat drifted peacefully, untouched by time. Nature held its breath, serene and still. In that fleeting moment, everything felt perfectly calm and beautifully alive.</p>
                <div className='footer-social-icons'>
                    <img src={assets.facebook_icon} alt=''/>
                    <img src={assets.twitter_icon} alt=''/>
                    <img src={assets.linkedin_icon} alt=''/>
                </div>
            </div>

            <div className='footer-content-center'>
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div className='footer-content-right'>
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+1-212-456-4756</li>
                        <li>contact@tomato.com</li>
                    </ul>
            </div>
        </div>

        <hr/>
        <p className='footer-copyright'> Copyright 2025 © Tomato.com - All Rights Reserved. </p>
    </div>
  )
}

export default Footer