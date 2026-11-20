import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, ChevronRight, Minus, Plus, Shield, RotateCcw, Truck } from 'lucide-react';
import { getProductById, products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import './ProductPage.css';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="product-page product-page--not-found">
        <div className="container">
          <h2>Product not found</h2>
          <Link to="/collections" className="btn-primary" style={{ marginTop: 24 }}>Back to Collections</Link>
        </div>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  return (
    <div className="product-page">
      {/* Breadcrumb */}
      <div className="product-page__breadcrumb">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb__item">Home</Link>
            <ChevronRight size={13} className="breadcrumb__sep" />
            <Link to="/collections" className="breadcrumb__item">Collections</Link>
            <ChevronRight size={13} className="breadcrumb__sep" />
            <Link to={`/collections?category=${product.category}`} className="breadcrumb__item">{product.collection}</Link>
            <ChevronRight size={13} className="breadcrumb__sep" />
            <span className="breadcrumb__item breadcrumb__item--current">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main product section */}
      <div className="container">
        <div className="product-page__main">
          {/* Image */}
          <div className="product-page__gallery">
            <div className="product-page__img-main">
              {product.badge && <span className="product-page__badge">{product.badge}</span>}
              <img src={product.image} alt={product.name} />
            </div>
            {/* Thumbnail strip — same image repeated as placeholder */}
            <div className="product-page__thumbnails">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`product-page__thumb${i === 1 ? ' product-page__thumb--active' : ''}`}>
                  <img src={product.image} alt={`${product.name} view ${i}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="product-page__info">
            <p className="product-page__collection">{product.collection}</p>
            <h1 className="product-page__name">{product.name}</h1>

            {/* Rating */}
            <div className="product-page__rating">
              <div className="product-page__stars">
                {stars.map((s) => (
                  <Star
                    key={s}
                    size={14}
                    fill={s <= Math.round(product.rating) ? 'currentColor' : 'none'}
                    className={s <= Math.round(product.rating) ? 'star--filled' : 'star--empty'}
                  />
                ))}
              </div>
              <span className="product-page__rating-val">{product.rating}</span>
              <span className="product-page__reviews">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="product-page__price-block">
              <span className="product-page__price">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="product-page__original">${product.originalPrice}</span>
                  <span className="product-page__savings">Save ${savings}</span>
                </>
              )}
            </div>

            <div className="product-page__divider" />

            {/* Colors */}
            {product.colors && (
              <div className="product-page__option-group">
                <p className="product-page__option-label">
                  Color: <span className="product-page__option-value">{product.colors[selectedColor]}</span>
                </p>
                <div className="product-page__colors">
                  {product.colors.map((color, i) => (
                    <button
                      key={color}
                      className={`product-page__color-btn${selectedColor === i ? ' product-page__color-btn--active' : ''}`}
                      onClick={() => setSelectedColor(i)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="product-page__option-group">
              <p className="product-page__option-label">Quantity</p>
              <div className="product-page__qty">
                <button className="product-page__qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  <Minus size={14} />
                </button>
                <span className="product-page__qty-val">{qty}</span>
                <button className="product-page__qty-btn" onClick={() => setQty((q) => Math.min(product.stock, q + 1))}>
                  <Plus size={14} />
                </button>
              </div>
              <p className="product-page__stock">{product.stock} in stock</p>
            </div>

            {/* CTAs */}
            <div className="product-page__ctas">
              <button
                className={`product-page__cart-btn${added ? ' product-page__cart-btn--added' : ''}`}
                onClick={handleAddToCart}
              >
                <ShoppingBag size={16} />
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <button
                className={`product-page__wishlist-btn${wishlisted ? ' product-page__wishlist-btn--active' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label="Wishlist"
              >
                <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="product-page__trust">
              <div className="trust-item">
                <Truck size={15} />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="trust-item">
                <Shield size={15} />
                <span>2-year manufacturer warranty</span>
              </div>
              <div className="trust-item">
                <RotateCcw size={15} />
                <span>30-day hassle-free returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="product-page__tabs">
          <div className="product-page__tab-nav">
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                className={`product-page__tab-btn${activeTab === tab ? ' product-page__tab-btn--active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="product-page__tab-content">
            {activeTab === 'description' && (
              <div className="product-page__description">
                <p>{product.description}</p>
                <p>Every WristStudio timepiece undergoes rigorous quality control to ensure it meets our exacting standards. The {product.name} is a testament to our commitment to precision, durability, and timeless design.</p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="product-page__specs">
                <table className="specs-table">
                  <tbody>
                    {Object.entries(product.specs).map(([key, val]) => (
                      <tr key={key} className="specs-table__row">
                        <td className="specs-table__key">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
                        </td>
                        <td className="specs-table__val">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="product-page__reviews-tab">
                <div className="reviews-summary">
                  <div className="reviews-summary__score">
                    <span className="reviews-summary__num">{product.rating}</span>
                    <div className="reviews-summary__stars">
                      {stars.map((s) => (
                        <Star key={s} size={18} fill={s <= Math.round(product.rating) ? 'currentColor' : 'none'}
                          className={s <= Math.round(product.rating) ? 'star--filled' : 'star--empty'} />
                      ))}
                    </div>
                    <p className="reviews-summary__count">Based on {product.reviews} reviews</p>
                  </div>
                </div>
                <p className="reviews-placeholder">Detailed reviews coming soon.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="product-page__related">
            <h2 className="section-heading">You May Also Like</h2>
            <div className="product-page__related-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
