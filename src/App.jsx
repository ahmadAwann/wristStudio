import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { useWishlist } from './context/WishlistContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ProductCard from './components/ProductCard/ProductCard';
import HomePage from './pages/HomePage/HomePage';
import CollectionsPage from './pages/CollectionsPage/CollectionsPage';
import ProductPage from './pages/ProductPage/ProductPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import CartPage from './pages/CartPage/CartPage';
import AuthPage from './pages/AuthPage/AuthPage';
import './App.css';

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Inline wishlist page — no extra file needed
function WishlistPage() {
  const { wishlist } = useWishlist();
  return (
    <div style={{ paddingTop: 72, minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
      <div style={{
        background: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border)',
        padding: '48px 0 40px',
        textAlign: 'center',
      }}>
        <div className="container">
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: 4,
            textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: 12,
          }}>
            Your Wishlist
          </p>
          <h1 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px,4vw,52px)',
            fontWeight: 500, color: 'var(--color-text-main)',
          }}>
            Saved Pieces
          </h1>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 40px 80px' }}>
        {wishlist.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 15, marginBottom: 24 }}>
              Your wishlist is empty.
            </p>
            <Link to="/collections" className="btn-primary">Browse Collections</Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 20,
          }}>
            {wishlist.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function AppLayout() {
  const { pathname } = useLocation();
  const isAuth = pathname === '/login';

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/about"       element={<AboutPage />} />
        <Route path="/contact"     element={<ContactPage />} />
        <Route path="/cart"        element={<CartPage />} />
        <Route path="/wishlist"    element={<WishlistPage />} />
        <Route path="/login"       element={<AuthPage />} />
        <Route path="*"            element={<HomePage />} />
      </Routes>
      {!isAuth && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <AppLayout />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
