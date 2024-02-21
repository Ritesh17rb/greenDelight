import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css'; // Import CSS for styling

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h1 className="logo-text">Green Delight</h1>
                    <p>
                        Green Delight is your one-stop shop for all your eco-friendly and sustainable products.
                    </p>
                    <div className="contact">
                        <span><FaFacebook /></span>
                        <span><FaTwitter /></span>
                        <span><FaInstagram /></span>
                    </div>
                </div>
                <div className="footer-section links">
                    <h2>Quick Links</h2>
                    <ul>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/policy">Privacy Policy</Link></li>
                    </ul>
                </div>
                <div className="footer-section contact-form">
                    <h2>Contact Us</h2>
                    <form>
                        <input type="email" name="email" className="text-input contact-input" placeholder="Your email address" />
                        <textarea rows="4" name="message" className="text-input contact-input" placeholder="Your message"></textarea>
                        <button type="submit" className="btn btn-primary">Send</button>
                    </form>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Green Delight. All Rights Reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
