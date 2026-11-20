import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import logo from '../../assets/WristStudio transparent.png';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import './Navbar.css';

const collectionLinks = [
  { label: "Men's Collection", to: '/collections?category=mens' },
  { label: "Women's Collection", to: '/collections?category=womens' },
  { label: 'Classic Collection', to: '/collections?category=classic' },
  { label: 'Sport Collection', to: '/collections?category=sport' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collections?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">

        {/* Logo */}
        <Link to="/" className="navbar__logo" onClick={() => setMobileOpen(false)}>
          <img src={logo} alt="WristStudio" />
        </Link>

        {/* Desktop nav */}
        <nav className="navbar__links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'} end>
            Home
          </NavLink>

          <div className="nav-dropdown" ref={dropdownRef}>
            <button
              className="nav-link nav-link--dropdown"
              onClick={() => setDropdownOpen((v) => !v)}
              aria-expanded={dropdownOpen}
            >
              Collections <ChevronDown size={14} />
            </button>
            {dropdownOpen && (
              <div className="nav-dropdown__menu">
                <Link to="/collections" className="nav-dropdown__item nav-dropdown__item--all"
                  onClick={() => setDropdownOpen(false)}>
                  All Collections
                </Link>
                <div className="nav-dropdown__divider" />
                {collectionLinks.map((c) => (
                  <Link
                    key={c.label}
                    to={c.to}
                    className="nav-dropdown__item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}>
            About Us
          </NavLink>

          <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}>
            Contact
          </NavLink>
        </nav>

        {/* Actions */}
        <div className="navbar__actions">
          {/* Search */}
          <div className={`navbar__search-wrap${searchOpen ? ' navbar__search-wrap--open' : ''}`}>
            {searchOpen && (
              <form onSubmit={handleSearch} className="navbar__search-form">
                <input
                  type="text"
                  placeholder="Search watches…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="navbar__search-input"
                />
              </form>
            )}
            <button
              className="navbar__icon-btn"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search"
            >
              {searchOpen ? <X size={18} /> : <Search size={18} />}
            </button>
          </div>

          {/* Wishlist */}
          <Link to="/wishlist" className="navbar__icon-btn" aria-label="Wishlist">
            <Heart size={18} />
            {wishlistCount > 0 && <span className="navbar__badge">{wishlistCount}</span>}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="navbar__icon-btn" aria-label="Cart">
            <ShoppingBag size={18} />
            {cartCount > 0 && <span className="navbar__badge">{cartCount}</span>}
          </Link>

          <Link to="/login" className="navbar__auth-btn">Login / Sign Up</Link>

          {/* Hamburger */}
          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile${mobileOpen ? ' navbar__mobile--open' : ''}`}>
        <NavLink to="/" className="mobile-link" onClick={() => setMobileOpen(false)} end>Home</NavLink>
        <div className="mobile-link mobile-link--group">
          <span>Collections</span>
          <div className="mobile-sub">
            <Link to="/collections" className="mobile-sub__item" onClick={() => setMobileOpen(false)}>All Collections</Link>
            {collectionLinks.map((c) => (
              <Link key={c.label} to={c.to} className="mobile-sub__item" onClick={() => setMobileOpen(false)}>
                {c.label}
              </Link>
            ))}
          </div>
        </div>
        <NavLink to="/about" className="mobile-link" onClick={() => setMobileOpen(false)}>About Us</NavLink>
        <NavLink to="/contact" className="mobile-link" onClick={() => setMobileOpen(false)}>Contact</NavLink>
        <Link to="/login" className="mobile-link mobile-link--auth" onClick={() => setMobileOpen(false)}>Login / Sign Up</Link>
      </div>
    </header>
  );
}
