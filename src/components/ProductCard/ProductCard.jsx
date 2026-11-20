import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      {product.badge && (
        <span className="product-card__badge">{product.badge}</span>
      )}

      <button
        className={`product-card__wishlist${wishlisted ? ' product-card__wishlist--active' : ''}`}
        onClick={handleWishlist}
        aria-label="Toggle wishlist"
      >
        <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
      </button>

      <div className="product-card__img-wrap">
        <img src={product.image} alt={product.name} className="product-card__img" />
      </div>

      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>

        <div className="product-card__rating">
          <div className="product-card__stars">
            {stars.map((s) => (
              <Star
                key={s}
                size={12}
                className={s <= Math.round(product.rating) ? 'star--filled' : 'star--empty'}
                fill={s <= Math.round(product.rating) ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <span className="product-card__rating-val">{product.rating}</span>
          <span className="product-card__reviews">({product.reviews})</span>
        </div>

        <div className="product-card__price-row">
          <span className="product-card__price">${product.price}</span>
          {product.originalPrice && (
            <span className="product-card__original">${product.originalPrice}</span>
          )}
        </div>

        <button className="product-card__cart-btn" onClick={handleAddToCart}>
          <ShoppingBag size={14} />
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
