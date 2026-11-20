import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import logo from '../../assets/WristStudio transparent.png';
import './Footer.css';

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon fill="#101820" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      {/* Newsletter bar */}
      <div className="footer__newsletter-bar">
        <div className="container footer__newsletter-inner">
          <div className="footer__newsletter-left">
            <Mail size={20} className="footer__newsletter-icon" />
            <div>
              <h4 className="footer__newsletter-title">Subscribe to our Newsletter</h4>
              <p className="footer__newsletter-sub">Get the latest arrivals and exclusive offers.</p>
            </div>
          </div>
          {submitted ? (
            <p className="footer__newsletter-success">Thank you for subscribing!</p>
          ) : (
            <form className="footer__newsletter-form" onSubmit={handleNewsletter}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="footer__newsletter-input"
                required
              />
              <button type="submit" className="footer__newsletter-btn" aria-label="Subscribe">
                <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main footer */}
      <div className="footer__main">
        <div className="container footer__main-inner">

          {/* Brand column */}
          <div className="footer__col footer__col--brand">
            <Link to="/">
              <img src={logo} alt="WristStudio" className="footer__logo" />
            </Link>
            <p className="footer__brand-tagline">TIME IN STYLE</p>
            <p className="footer__brand-desc">
              Crafting premium timepieces that blend tradition with modernity. Each watch is a statement of elegance and precision.
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social" aria-label="Facebook"><FacebookIcon /></a>
              <a href="#" className="footer__social" aria-label="Instagram"><InstagramIcon /></a>
              <a href="#" className="footer__social" aria-label="YouTube"><YoutubeIcon /></a>
              <a href="#" className="footer__social" aria-label="X"><XIcon /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h5 className="footer__col-title">Quick Links</h5>
            <ul className="footer__list">
              <li><Link to="/" className="footer__link">Home</Link></li>
              <li><Link to="/collections" className="footer__link">Collections</Link></li>
              <li><Link to="/about" className="footer__link">About Us</Link></li>
              <li><Link to="/contact" className="footer__link">Contact</Link></li>
              <li><Link to="/cart" className="footer__link">Shopping Cart</Link></li>
            </ul>
          </div>

          {/* Collections */}
          <div className="footer__col">
            <h5 className="footer__col-title">Collections</h5>
            <ul className="footer__list">
              <li><Link to="/collections?category=mens" className="footer__link">Men's Collection</Link></li>
              <li><Link to="/collections?category=womens" className="footer__link">Women's Collection</Link></li>
              <li><Link to="/collections?category=classic" className="footer__link">Classic Collection</Link></li>
              <li><Link to="/collections?category=sport" className="footer__link">Sport Collection</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer__col">
            <h5 className="footer__col-title">Customer Support</h5>
            <ul className="footer__list">
              <li><Link to="/contact" className="footer__link">Help Center</Link></li>
              <li><Link to="/contact" className="footer__link">Track Order</Link></li>
              <li><Link to="/contact" className="footer__link">Returns & Exchanges</Link></li>
              <li><Link to="/contact" className="footer__link">Warranty Info</Link></li>
              <li><Link to="/contact" className="footer__link">Size Guide</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} WristStudio. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <a href="#" className="footer__bottom-link">Privacy Policy</a>
            <a href="#" className="footer__bottom-link">Terms of Service</a>
            <a href="#" className="footer__bottom-link">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
